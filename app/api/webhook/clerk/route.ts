// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { WebhookEvent } from '@clerk/nextjs/server'
// import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
// import { clerkClient } from '@clerk/nextjs'
// import { NextResponse } from 'next/server'
 
// export async function POST(req: Request) {
 
//   // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
 
//   if (!WEBHOOK_SECRET) {
//     throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
//   }
 
//   // Get the headers
//   const headerPayload = headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");
 
//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Error occured -- no svix headers', {
//       status: 400
//     })
//   }
 
//   // Get the body
//   const payload = await req.json()
//   const body = JSON.stringify(payload);
 
//   // Create a new Svix instance with your secret.
//   const wh = new Webhook(WEBHOOK_SECRET);
 
//   let evt: WebhookEvent
 
//   // Verify the payload with the headers
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent
//   } catch (err) {
//     console.error('Error verifying webhook:', err);
//     return new Response('Error occured', {
//       status: 400
//     })
//   }
 
//   // Get the ID and type
//   const { id } = evt.data;
//   const eventType = evt.type;
 
//   if(eventType === 'user.created') {
//     const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

//     const user = {
//       clerkId: id,
//       email: email_addresses[0].email_address,
//       username: username!,
//       firstName: first_name,
//       lastName: last_name,
//       photo: image_url,
//     }

//     const newUser = await createUser(user);

//     if(newUser) {
//       await clerkClient.users.updateUserMetadata(id, {
//         publicMetadata: {
//           userId: newUser._id
//         }
//       })
//     }

//     return NextResponse.json({ message: 'OK', user: newUser })
//   }

//   if (eventType === 'user.updated') {
//     const {id, image_url, first_name, last_name, username } = evt.data

//     const user = {
//       firstName: first_name,
//       lastName: last_name,
//       username: username!,
//       photo: image_url,
//     }

//     const updatedUser = await updateUser(id, user)

//     return NextResponse.json({ message: 'OK', user: updatedUser })
//   }

//   if (eventType === 'user.deleted') {
//     const { id } = evt.data

//     const deletedUser = await deleteUser(id!)

//     return NextResponse.json({ message: 'OK', user: deletedUser })
//   }
 
//   return new Response('', { status: 200 })
// }
 




// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { WebhookEvent } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'
// import { clerkClient } from '@clerk/nextjs'
// import { createUser, updateUser, deleteUser } from '@/lib/actions/user.actions'
// import { connectToDatabase } from '@/lib/database'

// // POST handler for Clerk Webhook
// export async function POST(req: Request) {
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

//   if (!WEBHOOK_SECRET) {
//     throw new Error('WEBHOOK_SECRET is missing from .env');
//   }

//   const headerPayload = headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Missing Svix headers', { status: 400 });
//   }

//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   const wh = new Webhook(WEBHOOK_SECRET!);

//   let evt: WebhookEvent;

//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature
//     }) as WebhookEvent;
//   } catch (err) {
//     console.error("Webhook verification failed:", err);
//     return new Response('Webhook verification failed', { status: 400 });
//   }

//   const eventType = evt.type;

//   await connectToDatabase(); // ensure DB is connected

//   // 🔔 Handle user.created
//   if (eventType === 'user.created') {
//     const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

//     // Safely access email address, ensure it's not undefined
//     const emailObj = email_addresses[0];
//     if (!emailObj || !emailObj.email_address) {
//       return new Response('Email address missing', { status: 400 });
//     }

//     // Create user object with fallback for optional fields
//     const user = {
//       clerkId: id,
//       email: emailObj.email_address,
//       username: username || emailObj.email_address.split('@')[0],
//       firstName: first_name || '',
//       lastName: last_name || '',
//       photo: image_url || '',
//     };

//     console.log("Creating user:", user);
//     const newUser = await createUser(user);

//     // Ensure id is valid and defined before passing to updateUserMetadata
//     if (newUser && typeof id === 'string') {
//       await clerkClient.users.updateUserMetadata(id, {
//         publicMetadata: { userId: newUser._id }
//       });
//     } else {
//       console.error('User id is undefined or not a string');
//     }

//     return NextResponse.json({ message: 'User created', user: newUser });
//   }

//   // ✏️ Handle user.updated
//   if (eventType === 'user.updated') {
//     const { id, username, image_url, first_name, last_name } = evt.data;
//     const user = {
//       username: username || '',
//       firstName: first_name || '',
//       lastName: last_name || '',
//       photo: image_url || '',
//     };

//     // Ensure id is a string before calling updateUser
//     if (typeof id === 'string') {
//       const updatedUser = await updateUser(id, user);
//       return NextResponse.json({ message: 'User updated', user: updatedUser });
//     } else {
//       return new Response('User id is invalid', { status: 400 });
//     }
//   }

//   // ❌ Handle user.deleted
//   if (eventType === 'user.deleted') {
//     const { id } = evt.data;
//     // Ensure id is a string before calling deleteUser
//     if (typeof id === 'string') {
//       const deletedUser = await deleteUser(id);
//       return NextResponse.json({ message: 'User deleted', user: deletedUser });
//     } else {
//       return new Response('User id is invalid', { status: 400 });
//     }
//   }

//   return new Response('Unhandled event', { status: 200 });
// }





// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { WebhookEvent } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'
// import { clerkClient } from '@clerk/nextjs'
// import { createUser, updateUser, deleteUser } from '@/lib/actions/user.actions'
// import { connectToDatabase } from '@/lib/database'

// // POST handler for Clerk Webhook
// export async function POST(req: Request) {
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

//   if (!WEBHOOK_SECRET) {
//     throw new Error('WEBHOOK_SECRET is missing from .env')
//   }

//   const headerPayload = headers()
//   const svix_id = headerPayload.get('svix-id')
//   const svix_timestamp = headerPayload.get('svix-timestamp')
//   const svix_signature = headerPayload.get('svix-signature')

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Missing Svix headers', { status: 400 })
//   }

//   const payload = await req.json()
//   const body = JSON.stringify(payload)

//   const wh = new Webhook(WEBHOOK_SECRET)

//   let evt: WebhookEvent
//   try {
//     evt = wh.verify(body, {
//       'svix-id': svix_id,
//       'svix-timestamp': svix_timestamp,
//       'svix-signature': svix_signature,
//     }) as WebhookEvent
//   } catch (err) {
//     console.error('Webhook verification failed:', err)
//     return new Response('Webhook verification failed', { status: 400 })
//   }

//   const eventType = evt.type

//   await connectToDatabase()

//   // 🔔 Handle user.created
//   if (eventType === 'user.created') {
//     const { id, email_addresses, image_url, first_name, last_name, username } = evt.data

//     if (!id || !email_addresses || email_addresses.length === 0) {
//       console.error('Invalid user data')
//       return new Response('Invalid user data', { status: 400 })
//     }

//     const user = {
//       clerkId: id,
//       email: email_addresses[0]?.email_address || '',
//       username: username || email_addresses[0]?.email_address?.split('@')[0] || '',
//       firstName: first_name || '',
//       lastName: last_name || '',
//       photo: image_url || '',
//     }

//     console.log('Creating user:', user)
//     const newUser = await createUser(user)

//     if (newUser?._id) {
//       await clerkClient.users.updateUserMetadata(id, {
//         publicMetadata: {
//           userId: String(newUser._id),
//         },
//       })
//     }

//     return NextResponse.json({ message: 'User created', user: newUser })
//   }

//   // ✏️ Handle user.updated
//   if (eventType === 'user.updated') {
//     const { id, username, image_url, first_name, last_name } = evt.data

//     if (!id) {
//       console.error('Missing user ID on update')
//       return new Response('Missing user ID', { status: 400 })
//     }

//     const user = {
//       username: username || '',
//       firstName: first_name || '',
//       lastName: last_name || '',
//       photo: image_url || '',
//     }

//     const updatedUser = await updateUser(id, user)
//     return NextResponse.json({ message: 'User updated', user: updatedUser })
//   }

//   // ❌ Handle user.deleted
//   if (eventType === 'user.deleted') {
//     const { id } = evt.data

//     if (!id) {
//       console.error('Missing user ID on delete')
//       return new Response('Missing user ID', { status: 400 })
//     }

//     const deletedUser = await deleteUser(id)
//     return NextResponse.json({ message: 'User deleted', user: deletedUser })
//   }

//   return new Response('Unhandled event', { status: 200 })
// }


// app/api/webhook/clerk/route.ts

// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { WebhookEvent } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'
// import { clerkClient } from '@clerk/nextjs'
// import { createUser, updateUser, deleteUser } from '@/lib/actions/user.actions'
// import { connectToDatabase } from '@/lib/database'

// // POST handler for Clerk Webhook
// export async function POST(req: Request) {
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
//   if (!WEBHOOK_SECRET) {
//     throw new Error('WEBHOOK_SECRET is missing from .env')
//   }

//   const headerPayload = headers()
//   const svix_id = headerPayload.get('svix-id')
//   const svix_timestamp = headerPayload.get('svix-timestamp')
//   const svix_signature = headerPayload.get('svix-signature')

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Missing Svix headers', { status: 400 })
//   }

//   const payload = await req.json()
//   const body = JSON.stringify(payload)

//   const wh = new Webhook(WEBHOOK_SECRET!) // Type-safe: non-null assertion

//   let evt: WebhookEvent
//   try {
//     evt = wh.verify(body, {
//       'svix-id': svix_id,
//       'svix-timestamp': svix_timestamp,
//       'svix-signature': svix_signature,
//     }) as WebhookEvent
//   } catch (err) {
//     console.error('Webhook verification failed:', err)
//     return new Response('Webhook verification failed', { status: 400 })
//   }

//   const eventType = evt.type

//   await connectToDatabase()

//   if (eventType === 'user.created') {
//     const { id, email_addresses, image_url, first_name, last_name, username } = evt.data
  
//     if (!id || !email_addresses || email_addresses.length === 0) {
//       console.error('Invalid user data')
//       return new Response('Invalid user data', { status: 400 })
//     }
  
//     const user = {
//       clerkId: id,
//       email: email_addresses[0]?.email_address || '',
//       username: username || email_addresses[0]?.email_address?.split('@')[0] || '',
//       firstName: first_name || '',
//       lastName: last_name || '',
//       photo: image_url || '',
//     }
  
//     const newUser = await createUser(user)
  
//     // ✅ Assign MongoDB _id to Clerk publicMetadata.userId
//     if (newUser?._id) {
//       await clerkClient.users.updateUserMetadata(id, {
//         publicMetadata: {
//           userId: String(newUser._id),
//         },
//       })
//     }
  
//     return NextResponse.json({ message: 'User created', user: newUser })
//   }
  

//   // ✏️ Handle user.updated
//   if (eventType === 'user.updated') {
//     const { id, username, image_url, first_name, last_name } = evt.data

//     if (!id) {
//       console.error('Missing user ID on update')
//       return new Response('Missing user ID', { status: 400 })
//     }

//     const user = {
//       username: username || '',
//       firstName: first_name || '',
//       lastName: last_name || '',
//       photo: image_url || '',
//     }

//     const updatedUser = await updateUser(id, user)
//     return NextResponse.json({ message: 'User updated', user: updatedUser })
//   }

//   // ❌ Handle user.deleted
//   if (eventType === 'user.deleted') {
//     const { id } = evt.data

//     if (!id) {
//       console.error('Missing user ID on delete')
//       return new Response('Missing user ID', { status: 400 })
//     }

//     const deletedUser = await deleteUser(id)
//     return NextResponse.json({ message: 'User deleted', user: deletedUser })
//   }

//   return new Response('Unhandled event', { status: 200 })
// }


import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/nextjs';

import { createUser, updateUser, deleteUser } from '@/lib/actions/user.actions';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing webhook secret' }, { status: 400 });
  }

  const payload = await req.text();
  const headerPayload = headers();

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: any;

  try {
    evt = wh.verify(payload, {
      'svix-id': headerPayload.get('svix-id')!,
      'svix-timestamp': headerPayload.get('svix-timestamp')!,
      'svix-signature': headerPayload.get('svix-signature')!,
    });
  } catch (err) {
    console.error('❌ Webhook verification failed:', err);
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  const { type, data } = evt;

  // Handle user creation
  if (type === 'user.created') {
    const mongoUser = await createUser({
      clerkId: data.id,
      email: data.email_addresses[0]?.email_address,
      username: `${data.username || data.first_name}${data.last_name}`.toLowerCase(),
      firstName: data.first_name,
      lastName: data.last_name,
      photo: data.image_url,
    });

    if (mongoUser) {
      try {
        // Use updateUser, not updateUserMetadata
        await clerkClient.users.updateUser(data.id, {
          publicMetadata: {
            userId: mongoUser._id.toString(),
            role: 'user', // optional: default role
          },
        });

        const updatedUser = await clerkClient.users.getUser(data.id);
        console.log(`✅ Clerk publicMetadata set:`, updatedUser.publicMetadata);
      } catch (err) {
        console.error('❌ Failed to update Clerk publicMetadata:', err);
      }
    }
  }

  // Handle user updates
  if (type === 'user.updated') {
    await updateUser(data.id, {
      firstName: data.first_name,
      lastName: data.last_name,
      photo: data.image_url,
      username: data.username || `${data.first_name}${data.last_name}`.toLowerCase(),
    });
  }

  // Handle user deletion
  if (type === 'user.deleted') {
    await deleteUser(data.id);
  }

  return new NextResponse('✅ Webhook handled', { status: 200 });
}
