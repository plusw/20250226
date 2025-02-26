import { degrees, PDFDocument } from "pdf-lib";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";
import "./MainArea.css";
import UploadPdfDefault from "./UploadPdfDefault";

GlobalWorkerOptions.workerSrc = "pdf.worker.min.mjs"; // 根据你的路径修改
const MainArea = () => {
  const initPdfPageMaxWidth = 200;
  const [pdfPageMaxWidth, setPdfPageMaxWidth] = useState(initPdfPageMaxWidth);
  const [isZoomBigButtonDisabled, setZoomBigButton] = useState(false); // 控制按钮是否禁用
  const [isZoomSmallButtonDisabled, setZoomSmallButton] = useState(false); // 控制按钮是否禁用
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]); // 用于存储 canvas 元素的引用
  const [numPages, setNumPages] = useState<number>(0); // 存储 PDF 页面数
  const [file, setFile] = useState<File | undefined>(undefined);
  const [rotateAngle, setRotateAngle] = useState<number[]>([]); // 初始为空数组
  const [rotatedPdf, setRotatedPdf] = useState<string | null>(null); //用于下载
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        //console.log("文件已上传:", file.name);
        setFile(file); // 保存文件
      } else {
        alert("请上传一个有效的 PDF 文件");
      }
    }
  };

  const rotatePDF = (index: number) => {
    setRotateAngle((prev) => {
      const newAngles = [...prev];
      newAngles[index] = newAngles[index] + 90;
      return newAngles;
    });
  };
  const rotateAllPDF = () => {
    setRotateAngle((prev) => {
      const newAngles = [...prev];
      for (let i = 0; i < numPages; i++) {
        newAngles[i] = newAngles[i] + 90;
      }
      return newAngles;
    });
  };
  const removePdf = () => {
    // 清除 file 状态，导致 useEffect 不再加载 PDF
    setFile(undefined);

    if (canvasRefs.current) {
      canvasRefs.current.forEach((canvas) => {
        if (canvas) {
          const context = canvas.getContext("2d");
          if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height); // 清空 canvas 内容
          }
        }
      });
    }

    setNumPages(0); // 重置页面数
    setRotateAngle([]); // 重置旋转角度
  };

  useEffect(() => {
    if (numPages > 0) {
      setRotateAngle(new Array(numPages).fill(0)); // 根据页面数初始化 rotateAngle 数组
    }
  }, [numPages]); // 当 numPages 发生变化时执行
  const zoomBigPdfWidth = () => {
    if (pdfPageMaxWidth <= initPdfPageMaxWidth + 250) {
      setPdfPageMaxWidth(pdfPageMaxWidth + 50);
      setZoomSmallButton(false);
    } else {
      setZoomBigButton(true);
    }
  };
  const zoomSmallPdfWidth = () => {
    if (pdfPageMaxWidth >= initPdfPageMaxWidth - 50) {
      setPdfPageMaxWidth(pdfPageMaxWidth - 50);
      setZoomBigButton(false);
    } else {
      setZoomSmallButton(true);
    }
  };
  useEffect(() => {
    if (!file) return; // 如果没有文件，退出

    const loadPDF = async () => {
      try {
        const pdf = await getDocument(URL.createObjectURL(file)).promise;
        setNumPages(pdf.numPages); // 设置总页数

        // 遍历所有页面并渲染到 canvas 上
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1 });

          // 创建 canvas 元素
          const canvas = canvasRefs.current[pageNum - 1];
          if (canvas) {
            const context = canvas.getContext("2d");
            if (context) {
              page.render({
                canvasContext: context,
                viewport: viewport,
              });
            }
          }
        }
      } catch (error) {
        console.error("PDF 加载失败:", error);
      }
    };

    loadPDF();
  }, [file]); // 只有文件变更时才重新渲染 PDF

  useEffect(() => {
    if (canvasRefs.current) {
      canvasRefs.current.forEach((canvas, index) => {
        if (canvas) {
          canvas.style.transform = `rotate(${rotateAngle[index]}deg)`;
        }
      });
    }
    rotatePdf();
  }, [rotateAngle]);

  useEffect(() => {
    rotatePdf();
  }, [file]);

  const rotatePdf = async () => {
    if (!file) return;

    try {
      // 读取用户选择的 PDF 文件
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();

      // 旋转每一页
      pages.forEach((page, index) => {
        const angle = rotateAngle[index] || 0; // 获取对应页面的旋转角度，默认为 0
        page.setRotation(degrees(angle)); // 根据页面的角度进行旋转
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
    } else {
      console.log("还未生成");
    }
  };

  return (
    <>
      <div className="bg-[#f7f5ee] text-black main">
        <div className="container mx-auto py-20 space-y-5">
          <div className="flex flex-col text-center !mb-10 space-y-5">
            <h1 className="text-5xl font-serif">Rotate PDF Pages</h1>
            <p className="mt-2 text-gray-600 max-w-lg mx-auto">
              Simply click on a page to rotate it. You can then download your
              modified PDF.
            </p>
          </div>
          {file && (
            <div className="flex justify-center items-center space-x-3 selecto-ignore">
              <button className="btn !w-auto" onClick={() => rotateAllPDF()}>
                Rotate all
              </button>
              <button
                className="btn !w-auto  !bg-gray-800 haveTextButton"
                onClick={() => {
                  removePdf();
                }}
              >
                Remove PDF
                <span className="tooltip-text">
                  Remove this PDF and select a new one
                </span>
              </button>
              <button
                onClick={() => zoomBigPdfWidth()}
                disabled={isZoomBigButtonDisabled}
                className="bg-[#ff612f] shadow rounded-full p-2 flex items-center justify-center hover:scale-105 grow-0 shrink-0 disabled:opacity-50 !bg-white"
              >
                <img src="zoomBig.svg" className="w-5 h-5" />
              </button>
              <button
                onClick={() => zoomSmallPdfWidth()}
                disabled={isZoomSmallButtonDisabled}
                className="bg-[#ff612f] shadow rounded-full p-2 flex items-center justify-center hover:scale-105 grow-0 shrink-0 disabled:opacity-50 !bg-white"
              >
                <img src="zoomSmall.svg" className="w-5 h-5" />
              </button>
            </div>
          )}
          <div className="flex flex-wrap justify-center">
            {file ? (
              Array.from({ length: numPages }, (_, index) => (
                <div
                  key={index} // 添加 key，确保每个组件都有唯一标识
                  className="m-3"
                  style={{
                    maxWidth: pdfPageMaxWidth + "px",
                    flex: "0 0 " + pdfPageMaxWidth + "px",
                  }}
                >
                  <div
                    className="relative cursor-pointer pdf-page"
                    data-page-num="0"
                  >
                    <div className="absolute z-10 top-1 right-1 rounded-full p-1 hover:scale-105 hover:fill-white bg-[#ff612f] fill-white">
                      <img
                        src="rotate.svg"
                        className="w-3 filter invert"
                        onClick={() => rotatePDF(index)}
                      />
                    </div>
                    <div
                      className="overflow-hidden transition-transform"
                      onClick={() => rotatePDF(index)}
                    >
                      <div className="relative h-full w-full flex flex-col justify-between items-center shadow-md p-3 bg-white hover:bg-gray-50">
                        <div className="pointer-events-none w-full shrink">
                          <canvas
                            ref={(el) => {
                              canvasRefs.current[index] = el;
                            }}
                            height="841"
                            width="595"
                            style={{
                              width: "100%",
                              objectFit: "contain",
                              transitionProperty: "transform",
                              transitionTimingFunction:
                                "cubic-bezier(0.4, 0, 0.2, 1)",
                              transitionDuration: "150ms",
                              transform: "rotate(0deg)", // 旋转角度示例
                            }}
                          />
                        </div>
                        <div className="w-[90%] text-center shrink-0 text-xs italic overflow-hidden text-ellipsis whitespace-nowrap">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <UploadPdfDefault handleFileUpload={handleFileUpload} />
            )}
          </div>

          {file ? (
            <div className="flex flex-col justify-center items-center space-y-3 selecto-ignore">
              <button
                className="btn !w-auto shadow haveTextButton"
                aria-label="Split and download PDF"
                onClick={() => {
                  handleDownload();
                }}
              >
                Download
                <span className="tooltip-text">Split and download PDF</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default MainArea;
