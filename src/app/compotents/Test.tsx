import { PDFDocument, degrees } from "pdf-lib";
import React, { useState } from "react";

const PdfRotator: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [rotatedPdf, setRotatedPdf] = useState<string | null>(null);

  // 处理文件选择
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setPdfFile(file);
    }
  };

  // 旋转 PDF 文件
  const rotatePdf = async () => {
    if (!pdfFile) return;

    try {
      // 读取用户选择的 PDF 文件
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();

      // 旋转每一页
      pages.forEach((page) => {
        page.setRotation(degrees(90)); // 旋转 90 度
      });

      // 保存旋转后的 PDF 文件
      const rotatedPdfBytes = await pdfDoc.save();
      const rotatedBlob = new Blob([rotatedPdfBytes], {
        type: "application/pdf",
      });
      const rotatedPdfUrl = URL.createObjectURL(rotatedBlob);

      // 更新状态，生成新的 PDF 下载链接
      setRotatedPdf(rotatedPdfUrl);
    } catch (error) {
      console.error("PDF 旋转失败:", error);
    }
  };

  // 处理下载
  const handleDownload = () => {
    if (rotatedPdf) {
      const link = document.createElement("a");
      link.href = rotatedPdf;
      link.download = "rotated_pdf.pdf";
      link.click();
    }
  };

  return (
    <div>
      <h1>PDF 旋转工具</h1>
      {/* 文件选择 */}
      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      {/* 旋转按钮 */}
      <button onClick={rotatePdf} disabled={!pdfFile}>
        旋转 PDF
      </button>

      {/* 下载按钮 */}
      {rotatedPdf && <button onClick={handleDownload}>下载旋转后的 PDF</button>}
    </div>
  );
};

export default PdfRotator;
