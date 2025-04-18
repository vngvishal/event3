// utils/generateTicketHTML.ts
export function generateTicketHTML(ticket: {
  stripeId: string;
  totalAmount: string;
  event: { title: string };
  buyer: { firstName: string; lastName: string };
}) {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 30px; }
          .ticket { border: 2px dashed #333; padding: 20px; border-radius: 10px; width: 400px; margin: auto; }
          h2 { margin-bottom: 10px; }
          p { margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="ticket">
          <h2>🎫 Event Ticket</h2>
          <p><strong>Event:</strong> ${ticket.event.title}</p>
          <p><strong>Name:</strong> ${ticket.buyer.firstName} ${ticket.buyer.lastName}</p>
          <p><strong>Stripe ID:</strong> ${ticket.stripeId}</p>
          <p><strong>Total Paid:</strong> $${ticket.totalAmount}</p>
        </div>
      </body>
    </html>
  `;
}
