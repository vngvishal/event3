// // lib/pdf.ts
// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

// export async function generateTicketPDF({
//   eventTitle,
//   buyerName,
//   eventStartDateTime,
//   eventEndDateTime,
//   totalAmount,
//   orderId,
// }: {
//   eventTitle: string;
//   buyerName: string;
//   eventStartDateTime: Date;
//   eventEndDateTime: Date;
//   totalAmount: number;
//   orderId: string;
// }): Promise<Buffer> {
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([600, 400]);

//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const fontSize = 14;

//   let y = 360;

//   page.drawText('Event Ticket', {
//     x: 220,
//     y,
//     size: 20,
//     font,
//     color: rgb(0, 0, 0),
//   });

//   y -= 40;
//   const drawLine = (label: string, value: string) => {
//     page.drawText(`${label}: ${value}`, {
//       x: 50,
//       y,
//       size: fontSize,
//       font,
//       color: rgb(0, 0, 0),
//     });
//     y -= 25;
//   };

//   drawLine('Event', eventTitle);
//   drawLine('Name', buyerName);
//   drawLine('Start', eventStartDateTime.toLocaleString());
//   drawLine('End', eventEndDateTime.toLocaleString());
//   drawLine('Total', `INR ${totalAmount}`);
//   drawLine('Order ID', orderId);

//   const pdfBytes = await pdfDoc.save();
//   return Buffer.from(pdfBytes);
// }



// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
// import QRCode from 'qrcode';

// export async function generateTicketPDF({
//   eventTitle,
//   buyerName,
//   eventStartDateTime,
//   eventEndDateTime,
//   totalAmount,
//   orderId,
// }: {
//   eventTitle: string;
//   buyerName: string;
//   eventStartDateTime: Date;
//   eventEndDateTime: Date;
//   totalAmount: number;
//   orderId: string;
// }): Promise<Buffer> {
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([600, 400]);

//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const { width, height } = page.getSize();
//   const fontSize = 14;

//   let y = height - 50;

//   const drawLine = (label: string, value: string) => {
//     page.drawText(`${label}: ${value}`, {
//       x: 50,
//       y,
//       size: fontSize,
//       font,
//       color: rgb(0, 0, 0),
//     });
//     y -= 25;
//   };

//   drawLine('Event', eventTitle);
//   drawLine('Name', buyerName);
//   drawLine('Start', eventStartDateTime.toLocaleString());
//   drawLine('End', eventEndDateTime.toLocaleString());
//   drawLine('Total', `Rs. ${totalAmount}`);
//   drawLine('Order ID', orderId);

//   // 🧾 Generate QR Code
//   const qrCodeDataURL = await QRCode.toDataURL(orderId);
//   const qrImageBytes = qrCodeDataURL.split(',')[1];
//   const qrImage = await pdfDoc.embedPng(qrImageBytes);

//   const qrDims = qrImage.scale(0.5);
//   page.drawImage(qrImage, {
//     x: width - qrDims.width - 50,
//     y: 50,
//     width: qrDims.width,
//     height: qrDims.height,
//   });

//   const pdfBytes = await pdfDoc.save();
//   return Buffer.from(pdfBytes);
// }



import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';

export async function generateTicketPDF({
  eventTitle,
  buyerName,
  eventStartDateTime,
  eventEndDateTime,
  totalAmount,
  orderId,
}: {
  eventTitle: string;
  buyerName: string;
  eventStartDateTime: Date;
  eventEndDateTime: Date;
  totalAmount: number;
  orderId: string;
}): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const { width, height } = page.getSize();
  const fontSize = 14;

  const leftMargin = 50;
  const topMargin = height - 50;
  let y = topMargin;

  const lineSpacing = 25;
  const textWidth = 250; // Approximate width of the text block

  const drawLine = (label: string, value: string) => {
    page.drawText(`${label}: ${value}`, {
      x: leftMargin,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= lineSpacing;
  };

  // Draw ticket info on the left
  drawLine('Event', eventTitle);
  drawLine('Name', buyerName);
  drawLine('Start', eventStartDateTime.toLocaleString());
  drawLine('End', eventEndDateTime.toLocaleString());
  drawLine('Total', `Rs. ${totalAmount}`);
  drawLine('Order ID', `${orderId.slice(0, 8)}...${orderId.slice(-4)}`);

  // Generate QR code image from orderId
  const qrCodeDataURL = await QRCode.toDataURL(orderId);
  const qrImageBytes = qrCodeDataURL.split(',')[1];
  const qrImage = await pdfDoc.embedPng(qrImageBytes);

  const qrDims = qrImage.scale(0.5);

  // Position QR to the right of the information block, aligned to top of text
  const qrX = leftMargin + textWidth + 20;
  const qrY = topMargin - qrDims.height + fontSize;

  page.drawImage(qrImage, {
    x: qrX,
    y: qrY,
    width: qrDims.width,
    height: qrDims.height,
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
