// import stripe from 'stripe'
// import { NextResponse } from 'next/server'
// import { createOrder } from '@/lib/actions/order.actions'

// export async function POST(request: Request) {
//   const body = await request.text()

//   const sig = request.headers.get('stripe-signature') as string
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

//   let event

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
//   } catch (err) {
//     return NextResponse.json({ message: 'Webhook error', error: err })
//   }

//   // Get the ID and type
//   const eventType = event.type

//   // CREATE
//   if (eventType === 'checkout.session.completed') {
//     const { id, amount_total, metadata } = event.data.object

//     const order = {
//       stripeId: id,
//       eventId: metadata?.eventId || '',
//       buyerId: metadata?.buyerId || '',
//       totalAmount: amount_total ? (amount_total / 100).toString() : '0',
//       createdAt: new Date(),
//     }

//     const newOrder = await createOrder(order)
//     return NextResponse.json({ message: 'OK', order: newOrder })
//   }

//   return new Response('', { status: 200 })
// }


// // app/api/stripe/webhook/route.ts
// export const runtime = 'nodejs';


// import Stripe from 'stripe';
// import { NextResponse } from 'next/server';
// import {connectToDatabase} from '@/lib/database';
// import Ticket from '@/app/models/Ticket';
// import { generateTicketPDF } from '@/app/utils/generateTicketPDF';
// import { createOrder } from '@/lib/actions/order.actions';
// import Event from '@/lib/database/models/event.model';
// import User from '@/lib/database/models/user.model';

// // app/api/stripe/webhook/route.ts
// ;
// import { buffer } from 'micro'; // Make sure to install micro + types


// import Order from '@/lib/database/models/order.model';
// // import Ticket from '@/app/models/Ticket'; // Uncomment if you're using it
// // import { generateTicketPDF } from '@/app/utils/generateTicketPDF'; // Optional

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2023-10-16',
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: Request) {
//   await connectToDatabase();

//   const rawBody = await req.arrayBuffer();
//   const buf = Buffer.from(rawBody);
//   const sig = req.headers.get('stripe-signature') as string;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       buf,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (err: any) {
//     console.error('❌ Webhook signature verification failed.', err.message);
//     return new Response(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object as Stripe.Checkout.Session;
//     const stripeId = session.id;
//     const metadata = session.metadata;

//     if (!metadata?.eventId || !metadata?.buyerId || !metadata?.totalAmount) {
//       return NextResponse.json(
//         { message: 'Missing metadata in session' },
//         { status: 400 }
//       );
//     }

//     const { eventId, buyerId, totalAmount } = metadata;

//     try {
//       const eventDoc = await Event.findById(eventId).lean();
//       if (!eventDoc || !('title' in eventDoc)) {
//         return NextResponse.json({ message: 'Event not found' }, { status: 404 });
//       }

//       const userDoc = await User.findById(buyerId).lean();
//       if (!userDoc || !('firstName' in userDoc) || !('lastName' in userDoc)) {
//         return NextResponse.json({ message: 'User not found' }, { status: 404 });
//       }

//       await Order.create({
//         stripeId,
//         totalAmount,
//         event: {
//           _id: eventDoc._id,
//           title: eventDoc.title,
//         },
//         buyer: {
//           _id: userDoc._id,
//           firstName: userDoc.firstName,
//           lastName: userDoc.lastName,
//         },
//       });

//       // If you’re using Ticket instead of Order:
//       // await Ticket.create({
//       //   stripeId,
//       //   totalAmount,
//       //   event: {
//       //     _id: eventDoc._id,
//       //     title: eventDoc.title,
//       //   },
//       //   buyer: {
//       //     _id: userDoc._id,
//       //     firstName: userDoc.firstName,
//       //     lastName: userDoc.lastName,
//       //   },
//       // });

//       return NextResponse.json({ received: true }, { status: 200 });
//     } catch (error) {
//       console.error('❌ Webhook processing failed:', error);
//       return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//     }
//   }

//   return NextResponse.json({ received: true });
// }




// import Stripe from 'stripe';
// import { NextResponse } from 'next/server';
// import { headers } from 'next/headers';
// import { connectToDatabase } from '@/lib/database';
// import Order from '@/lib/database/models/order.model';
// import { Types } from 'mongoose';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2023-10-16',
// });

// export async function POST(req: Request) {
//   const body = await req.text();
//   const signature = headers().get('stripe-signature') as string;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
//   } catch (err) {
//     console.error('Webhook signature verification failed:', err);
//     return new NextResponse('Webhook Error', { status: 400 });
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object as Stripe.Checkout.Session;

//     const metadata = session.metadata;
//     if (!metadata || !metadata.eventId || !metadata.buyerId || !metadata.totalAmount) {
//       return NextResponse.json({ message: 'Missing metadata in Stripe session' }, { status: 400 });
//     }

//     if (!Types.ObjectId.isValid(metadata.eventId) || !Types.ObjectId.isValid(metadata.buyerId)) {
//       return NextResponse.json({ message: 'Invalid eventId or buyerId' }, { status: 400 });
//     }

//     try {
//       await connectToDatabase();

//       const newOrder = new Order({
//         event: metadata.eventId,
//         buyer: metadata.buyerId,
//         totalAmount: parseFloat(metadata.totalAmount),
//         stripeId: session.id,
//       });

//       await newOrder.save();
//     } catch (error) {
//       console.error('Failed to save order:', error);
//       return new NextResponse('Database Error', { status: 500 });
//     }
//   }

//   return new NextResponse('Webhook received', { status: 200 });
// }



import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { connectToDatabase } from '@/lib/database';
import Order from '@/lib/database/models/order.model';
import { Types } from 'mongoose';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return new NextResponse('Webhook Error', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const metadata = session.metadata;
    if (!metadata || !metadata.eventId || !metadata.buyerId || !metadata.totalAmount) {
      return NextResponse.json({ message: '❌ Missing metadata in Stripe session' }, { status: 400 });
    }

    if (!Types.ObjectId.isValid(metadata.eventId) || !Types.ObjectId.isValid(metadata.buyerId)) {
      return NextResponse.json({ message: '❌ Invalid eventId or buyerId' }, { status: 400 });
    }

    try {
      await connectToDatabase();

      // Prevent duplicate orders using stripeId
      const existingOrder = await Order.findOne({ stripeId: session.id });
      if (existingOrder) {
        console.log('⚠️ Order already exists for this session');
        return new NextResponse('Order already processed', { status: 200 });
      }

      const newOrder = new Order({
        event: metadata.eventId,
        buyer: metadata.buyerId,
        totalAmount: parseFloat(metadata.totalAmount),
        stripeId: session.id,
      });

      await newOrder.save();
      console.log('✅ Order saved:', newOrder._id);
    } catch (error) {
      console.error('❌ Failed to save order:', error);
      return new NextResponse('Database Error', { status: 500 });
    }
  }

  return new NextResponse('✅ Webhook received', { status: 200 });
}
