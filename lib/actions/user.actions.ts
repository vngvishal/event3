// 'use server'

// import { revalidatePath } from 'next/cache'

// import { connectToDatabase } from '@/lib/database'
// import User from '@/lib/database/models/user.model'
// import Order from '@/lib/database/models/order.model'
// import Event from '@/lib/database/models/event.model'
// import { handleError } from '@/lib/utils'

// import { CreateUserParams, UpdateUserParams } from '@/types'

// // export async function createUser(user: CreateUserParams) {
// //   try {
// //     await connectToDatabase()

// //     const newUser = await User.create(user)
// //     return JSON.parse(JSON.stringify(newUser))
// //   } catch (error) {
// //     handleError(error)
// //   }
// // }


// // Create user action
// export async function createUser(user: CreateUserParams) {
//   try {
//     await connectToDatabase()

//     const existingUser = await User.findOne({ clerkId: user.clerkId })
//     if (existingUser) return existingUser

//     const newUser = await User.create(user)
    
//     // If publicMetadata.userId is missing, assign MongoDB _id as userId
//     if (!newUser.publicMetadata?.userId) {
//       newUser.publicMetadata.userId = String(newUser._id)
//       await newUser.save() // Save the updated user with the new userId
//     }

//     return newUser
//   } catch (error) {
//     console.error("Error creating user:", error)
//     throw error
//   }
// }

// // Update user action
// export async function updateUser(clerkId: string, user: UpdateUserParams) {
//   try {
//     await connectToDatabase()

//     const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })

//     if (!updatedUser) throw new Error('User update failed')

//     // If publicMetadata.userId is missing after update, assign MongoDB _id as userId
//     if (!updatedUser.publicMetadata?.userId) {
//       updatedUser.publicMetadata.userId = String(updatedUser._id)
//       await updatedUser.save() // Save the updated user with the new userId
//     }

//     return updatedUser
//   } catch (error) {
//     console.error("Error updating user:", error)
//     throw error
//   }
// }

// export async function deleteUser(clerkId: string) {
//   try {
//     await connectToDatabase()

//     // Find user to delete
//     const userToDelete = await User.findOne({ clerkId })

//     if (!userToDelete) {
//       throw new Error('User not found')
//     }

//     // Unlink relationships
//     await Promise.all([
//       // Update the 'events' collection to remove references to the user
//       Event.updateMany(
//         { _id: { $in: userToDelete.events } },
//         { $pull: { organizer: userToDelete._id } }
//       ),

//       // Update the 'orders' collection to remove references to the user
//       Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
//     ])

//     // Delete user
//     const deletedUser = await User.findByIdAndDelete(userToDelete._id)
//     revalidatePath('/')

//     return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
//   } catch (error) {
//     handleError(error)
//   }
// }




'use server'
import '@/lib/database/models/user.model';
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import Order from '@/lib/database/models/order.model'
import Event from '@/lib/database/models/event.model'
import { handleError } from '@/lib/utils'
import { CreateUserParams, UpdateUserParams } from '@/types'
import { IUserDocument } from '@/lib/database/models/user.model' // Assuming UserDocument is your mongoose model type

// Create user action
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase()

    // Check if user already exists
    const existingUser = await User.findOne({ clerkId: user.clerkId }).lean<IUserDocument>()
    if (existingUser) return existingUser

    // Create new user in MongoDB
    const newUser = await User.create(user)
    return newUser.toObject() // Ensuring plain object return for ease of use
  } catch (error) {
    console.error('Error creating user:', error)
    handleError(error)
  }
}

// Update user action
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase()

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true }).lean<IUserDocument>()

    if (!updatedUser) throw new Error('User update failed')

    return updatedUser
  } catch (error) {
    console.error('Error updating user:', error)
    handleError(error)
  }
}

// Delete user action
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase()

    const userToDelete = await User.findOne({ clerkId }).lean<IUserDocument>()

    if (!userToDelete) {
      throw new Error('User not found')
    }

    // Remove relationships
    await Promise.all([
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } }
      ),
    ])

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath('/')

    return deletedUser ? deletedUser : null
  } catch (error) {
    console.error('Error deleting user:', error)
    handleError(error)
  }
}
