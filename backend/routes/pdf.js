import express from 'express';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const router = express.Router();

router.post('/export/pdf', async (req, res) => {
  const { content, filename } = req.body;
  if (!content || !filename) return res.status(400).json({ error: "Missing content or filename" });

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;
  const lines = content.split('\n');
  let y = height - 40;

  for (let line of lines) {
    page.drawText(line, {
      x: 40,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= fontSize + 4;
    if (y < 40) break; // prevent overflow for now
  }

  const pdfBytes = await pdfDoc.save();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(Buffer.from(pdfBytes));
});

export default router;
