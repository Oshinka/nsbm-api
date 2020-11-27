const PDFDocument = require('pdfkit');

module.exports = function (data) {
   // Create a document
   const doc = new PDFDocument;

   doc.info = {
      Title: 'Receipt',
      Author: 'NSBM',
      subject: 'Course Enrollment'
   };

   // Add an image, constrain it to a given size, and center it vertically and horizontally
   doc.image('public/images/logo.png', 250, 50, {
      width: 150,
   });

   // Embed a font, set the font size, and render some text
   doc.fontSize(30)
      .text('PAYMENT RECEIPT', 200, 150);

   doc.fontSize(15)
      .text(`Name       :     ${data.name}`, 100, 250);

   doc.fontSize(15)
      .text(`Amount     :     ${data.amount}LKR`, 100, 300);

   doc.fontSize(15)
      .text(`Payment Id :     ${data.paymentId}`, 100, 350);

   doc.image('public/images/qrCode.png', 400, 225, {
      width: 150,
   });

   // Finalize PDF file
   doc.end();

   return doc;
}