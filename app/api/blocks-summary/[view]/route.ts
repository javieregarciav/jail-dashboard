import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import path from "path";
import fs from "fs";
import PDFDocument from "pdfkit";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: { view: string } }
) {
  try {
    const { view } = params;

    if (!/^block\d+_inmates$|^blocks_summary$|^all_inmates$/.test(view)) {
      return NextResponse.json({ error: "Vista inválida" }, { status: 400 });
    }

    const data = await prisma.$queryRawUnsafe(`SELECT * FROM ${view}`);

    const fontPath = path.join(
      process.cwd(),
      "public/fonts/Roboto-Regular.ttf"
    );
    if (!fs.existsSync(fontPath)) {
      throw new Error("No se encontró la fuente Roboto en /public/fonts/");
    }

    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
      layout: "landscape",
      font: fontPath,
    });
    const chunks: Buffer[] = [];
    doc.registerFont("Roboto", fontPath);
    doc.font("Roboto");

    doc
      .fontSize(18)
      .fillColor("#000000")
      .text(`Reporte: ${view}`, { align: "center" });
    doc.moveDown();

    if (!data || data.length === 0) {
      doc.fontSize(12).text("No hay datos disponibles.", { align: "center" });
    } else {
      const keys = Object.keys(data[0]);
      const numCols = keys.length;

      const startX = 40;
      const tableWidth = doc.page.width - 80;
      const colWidth = tableWidth / numCols;
      const headerHeight = 30;
      const cellPadding = 5;
      let y = doc.y + 10;

      const drawHeaders = (yPos: number) => {
        doc.rect(startX, yPos, tableWidth, headerHeight).fill("#333333");

        doc.fontSize(7).fillColor("#ffffff");
        for (let i = 0; i < numCols; i++) {
          const x = startX + i * colWidth;
          doc.text(keys[i].toUpperCase(), x + cellPadding, yPos + 8, {
            width: colWidth - cellPadding * 2,
            align: "left",
            lineBreak: true,
          });
        }
      };

      drawHeaders(y);
      y += headerHeight;

      for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        const row = data[rowIndex];

        let rowHeight = 25;
        for (let i = 0; i < numCols; i++) {
          const text = row[keys[i]] !== null ? String(row[keys[i]]) : "-";
          const cellHeight = doc.heightOfString(text, {
            width: colWidth - cellPadding * 2,
            fontSize: 8,
          });
          if (cellHeight + cellPadding * 2 > rowHeight) {
            rowHeight = cellHeight + cellPadding * 2;
          }
        }

        if (y + rowHeight > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
          y = doc.page.margins.top;
          drawHeaders(y);
          y += headerHeight;
        }

        const bgColor = rowIndex % 2 === 0 ? "#f0f0f0" : "#ffffff";
        doc
          .rect(startX, y, tableWidth, rowHeight)
          .fillAndStroke(bgColor, "#dddddd");

        doc.fillColor("#000000").fontSize(8);
        for (let i = 0; i < numCols; i++) {
          const text = row[keys[i]] !== null ? String(row[keys[i]]) : "-";
          const x = startX + i * colWidth;
          doc.text(text, x + cellPadding, y + cellPadding, {
            width: colWidth - cellPadding * 2,
            align: "left",
            lineBreak: true,
          });
        }

        y += rowHeight;
      }
    }

    doc.end();
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));

    return await new Promise((resolve) => {
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(
          new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `inline; filename="${view}.pdf"`,
            },
          })
        );
      });
    });
  } catch (error: any) {
    console.error("Error al generar PDF:", error);
    return NextResponse.json(
      { error: "Error al generar PDF", details: error.message },
      { status: 500 }
    );
  }
}
