import PDFDocument from 'pdfkit';

export async function generateTicketPDF({
  eventTitle,
  buyerName,
  totalAmount,
  orderId,
}: {
  eventTitle: string;
  buyerName: string;
  totalAmount: string;
  orderId: string;
}): Promise<Buffer> {
  const doc = new PDFDocument();
  const bufferChunks: Buffer[] = [];

  return new Promise((resolve, reject) => {
    doc.on('data', (chunk: Buffer) => bufferChunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(bufferChunks)));
    doc.on('error', reject);

    doc.fontSize(20).text('🎫 Event Ticket', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Event: ${eventTitle}`);
    doc.text(`Name: ${buyerName}`);
    doc.text(`Total Paid: $${totalAmount}`);
    doc.text(`Order ID: ${orderId}`);
    doc.end();
  });
}
