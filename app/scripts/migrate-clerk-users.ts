// app/scripts/migrate-clerk-users.ts
import 'dotenv/config'
import { clerkClient } from '@clerk/nextjs/server'
import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'

async function migrateUsers() {
  try {
    await connectToDatabase()

    let totalUpdated = 0
    let totalSkipped = 0

    const users = await clerkClient.users.getUserList()

    for (const user of users) {
      const existingUserId = user.publicMetadata?.userId

      if (!existingUserId) {
        console.log(`User ${user.id} is missing publicMetadata.userId...`)

        const mongoUser = await User.findOne({ clerkId: user.id })

        if (mongoUser) {
          await clerkClient.users.updateUserMetadata(user.id, {
            publicMetadata: {
              userId: String(mongoUser._id),
            },
          })

          console.log(`✅ Updated Clerk user ${user.id} with MongoDB _id ${mongoUser._id}`)
          totalUpdated++
        } else {
          console.warn(`⚠️ No MongoDB user found for Clerk user ${user.id}. Skipping.`)
          totalSkipped++
        }
      }
    }

    console.log(`🚀 Migration complete: ${totalUpdated} users updated, ${totalSkipped} skipped.`)
  } catch (err) {
    console.error('❌ Migration failed:', err)
  }
}

migrateUsers()
