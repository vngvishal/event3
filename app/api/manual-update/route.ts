// import { NextResponse } from 'next/server'
// import { clerkClient } from '@clerk/nextjs/server'

// export async function GET() {
//   try {
//     const clerkId = 'user_2voD2t6JTd5RibXZ9mZXGyHvrKh' // Replace this with the actual Clerk user ID
//     const mongoUserId = '67ff921b078e5a486ee0856f' // Replace with actual MongoDB _id
    
//     await clerkClient.users.updateUserMetadata(clerkId, {
//       publicMetadata: {
//         userId: mongoUserId,
//       },
//     })

//     console.log(`✅ Successfully updated publicMetadata for ${clerkId}`)
//     return NextResponse.json({ message: 'Metadata updated' })
//   } catch (error: any) {
//     console.error('❌ Error updating metadata:', error?.errors || error?.message || error)
//     return new Response('Failed to update metadata', { status: 500 })
//   }
// }



// app/api/manual-update/route.ts
import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const clerkUserId = 'user_2voH5' // Replace with real user
  const mongoUserId = '67ff921b078e5a486ee0856f'

  try {
    console.log('🧾 clerkUserId:', clerkUserId)
    console.log('🧾 mongoUserId:', mongoUserId)

    const user = await clerkClient.users.getUser(clerkUserId)
    console.log('✅ User found:', user.id)

    await clerkClient.users.updateUserMetadata(clerkUserId, {
      publicMetadata: {
        userId: mongoUserId,
      },
    })

    console.log('✅ Metadata updated')
    return NextResponse.json({ message: 'Success' })
  } catch (err) {
    console.error('❌ Failed to update metadata:', err)
    return new Response('Error updating metadata', { status: 500 })
  }
}
