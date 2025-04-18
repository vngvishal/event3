
// import { connectToDatabase } from '@/lib/database';
// import Order from '@/lib/database/models/order.model';


// import '@/lib/database/models/event.model';
// import '@/lib/database/models/user.model';
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

//   const leftMargin = 50;
//   const topMargin = height - 50;
//   let y = topMargin;

//   const lineSpacing = 25;
//   const textWidth = 250; // Approximate width of the text block

//   const drawLine = (label: string, value: string) => {
//     page.drawText(`${label}: ${value}`, {
//       x: leftMargin,
//       y,
//       size: fontSize,
//       font,
//       color: rgb(0, 0, 0),
//     });
//     y -= lineSpacing;
//   };

//   // Draw ticket info on the left
//   drawLine('Event', eventTitle);
//   drawLine('Name', buyerName);
//   drawLine('Start', eventStartDateTime.toLocaleString());
//   drawLine('End', eventEndDateTime.toLocaleString());
//   drawLine('Total', `Rs. ${totalAmount}`);
//   drawLine('Order ID', `${orderId.slice(0, 8)}...${orderId.slice(-4)}`);

//   // Generate QR code image from orderId
//   const qrCodeDataURL = await QRCode.toDataURL(orderId);
//   const qrImageBytes = qrCodeDataURL.split(',')[1];
//   const qrImage = await pdfDoc.embedPng(qrImageBytes);

//   const qrDims = qrImage.scale(0.5);

//   // Position QR to the right of the information block, aligned to top of text
//   const qrX = leftMargin + textWidth + 20;
//   const qrY = topMargin - qrDims.height + fontSize;

//   page.drawImage(qrImage, {
//     x: qrX,
//     y: qrY,
//     width: qrDims.width,
//     height: qrDims.height,
//   });

//   const pdfBytes = await pdfDoc.save();
//   return Buffer.from(pdfBytes);
// }



import { connectToDatabase } from '@/lib/database';
import Order from '@/lib/database/models/order.model';

import '@/lib/database/models/event.model';
import '@/lib/database/models/user.model';

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
  const page = pdfDoc.addPage([600, 350]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { width, height } = page.getSize();

  // Draw ticket border
  page.drawRectangle({
    x: 25,
    y: 25,
    width: width - 50,
    height: height - 50,
    borderColor: rgb(0.6, 0.6, 0.6),
    borderWidth: 1.5,
    color: rgb(1, 1, 1),
  });

  // Header
  page.drawText('EVENT TICKET', {
    x: 40,
    y: height - 50,
    size: 22,
    font: boldFont,
    color: rgb(0.2, 0.2, 0.7),
  });

  // Divider
  page.drawLine({
    start: { x: 40, y: height - 60 },
    end: { x: width - 40, y: height - 60 },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });

  const leftMargin = 40;
  let y = height - 90;
  const lineSpacing = 24;
  const labelSize = 13;
  const valueSize = 13;

  const drawLine = (label: string, value: string) => {
    page.drawText(`${label}:`, {
      x: leftMargin,
      y,
      size: labelSize,
      font: boldFont,
      color: rgb(0.15, 0.15, 0.15),
    });
    page.drawText(value, {
      x: leftMargin + 90,
      y,
      size: valueSize,
      font,
      color: rgb(0.15, 0.15, 0.15),
    });
    y -= lineSpacing;
  };

  // Ticket Details
  drawLine('Event', eventTitle);
  drawLine('Name', buyerName);
  drawLine('Start', eventStartDateTime.toLocaleString());
  drawLine('End', eventEndDateTime.toLocaleString());
  drawLine('Total Paid', `Rs. ${totalAmount}`);
  drawLine('Order ID', `${orderId.slice(0, 8)}...${orderId.slice(-4)}`);

  // QR Code
  const qrCodeDataURL = await QRCode.toDataURL(orderId);
  const qrImageBytes = qrCodeDataURL.split(',')[1];
  const qrImage = await pdfDoc.embedPng(qrImageBytes);
  const qrDims = qrImage.scale(0.7);

  const qrX = width - qrDims.width - 50;
  const qrY = 60;

  page.drawImage(qrImage, {
    x: qrX,
    y: qrY,
    width: qrDims.width,
    height: qrDims.height,
  });

  // QR Label
  page.drawText('Scan for verification', {
    x: qrX,
    y: qrY - 15,
    size: 10,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
