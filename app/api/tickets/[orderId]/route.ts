// app/api/tickets/[orderId]/route.ts
import '@/lib/database/models/event.model';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import Order from '@/lib/database/models/order.model';
import Event  from '@/lib/database/models/event.model';
import User  from '@/lib/database/models/user.model';
import { generateTicketPDF } from '@/lib/pdf';

export async function GET(req: Request, { params }: { params: { orderId: string } }) {
  const { orderId } = params;

  try {
    await connectToDatabase();

    // Find the order with populated event and buyer info
    const order = await Order.findById(orderId)
      .populate('event')
      .populate('buyer')
      .exec();

    if (!order) {
      return new NextResponse('Order not found', { status: 404 });
    }

    const pdfBuffer = await generateTicketPDF({
      eventTitle: order.event.title,
      buyerName: `${order.buyer.firstName} ${order.buyer.lastName}` || order.buyer.username,
      eventStartDateTime: new Date(order.event.startDateTime),
      eventEndDateTime: new Date(order.event.endDateTime),
      totalAmount: order.totalAmount,
      orderId: order.stripeId || order._id.toString()
    });

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ticket-${orderId}.pdf"`
      },
    });
  } catch (error) {
    console.error('Error generating ticket PDF:', error);
    return new NextResponse('Failed to generate ticket PDF', { status: 500 });
  }
}
