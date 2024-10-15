"use client";

import { Document, Page } from "react-pdf";
import { useRef, useState } from "react";
import screenfull from "screenfull";
import ZoomOutSvg from "@/assets/images/zoomout.svg";
import ZoomInSvg from "@/assets/images/zoomin.svg";
import FullscreenSvg from "@/assets/images/fullscreen.svg";
import CollapseContentSvg from "@/assets/images/collapse_content.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerWithScrollProps {
    pdfUrl: string;
    fileName: string;
    isPdfOpen: boolean;
    handleClose: () => void;
    handleOpen: () => void;
}

export const PdfViewer: React.FC<PdfViewerWithScrollProps> = ({
    pdfUrl,
    fileName,
    isPdfOpen: openPdf,
    handleClose,
    handleOpen,
}) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [scale, setScale] = useState(0.8);

    const containerRef = useRef<HTMLDivElement>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const handleZoomIn = () => {
        setScale((prev) => (prev + 0.2 > 2.0 ? 2.0 : prev + 0.2)); // Max zoom to 200%
    };

    const handleZoomOut = () => {
        setScale((prev) => (prev - 0.2 < 0.6 ? 0.6 : prev - 0.2)); // Min zoom to 60%
    };

    const handleFullScreen = () => {
        if (containerRef.current && screenfull.isEnabled) {
            screenfull.request(containerRef.current).catch((err) => {
                console.error("Full screen failed:", err);
            });
        }
    };

    const togglePdf = () => {
        if (openPdf) {
            handleClose();
        } else {
            handleOpen();
        }
    };

    return (
        <div className="bg-[#FFFFFF7A] rounded-[24px] overflow-hidden">
            <div className="flex md:items-center items-start justify-between p-[12px] md:flex-row flex-col gap-[8px]">
                <p className="font-semibold text-sm text-[#5B6170] bg-[#98A1BB1F] rounded-[12px] px-[12px] py-[4px] w-[205px] truncate">
                    {fileName}
                </p>

                <div className="flex items-center gap-[12px] md:w-fit w-full">
                    <div className="flex items-center gap-[6px] md:flex-none flex-1">
                        <Button className="bg-transparent hover:bg-transparent m-0 p-0 h-fit shadow-none">
                            <Image src={ZoomOutSvg} alt="Zoom Out" onClick={handleZoomOut} />
                        </Button>
                        <p className="text-xs font-bold text-[#5B6170]">{(scale * 100).toFixed(0)}%</p>
                        <Button className="bg-transparent hover:bg-transparent m-0 p-0 h-fit shadow-none">
                            <Image src={ZoomInSvg} alt="Zoom In" onClick={handleZoomIn} />
                        </Button>
                    </div>
                    <div
                        className="w-[24px] h-[24px] flex items-center justify-center bg-[#FFFFFF] cursor-pointer rounded-full m-0 hover:bg-[#FFFFFF] shadow-none"
                        role="button"
                        onClick={handleFullScreen}
                    >
                        <Image src={FullscreenSvg} alt="Fullscreen" />
                    </div>
                    <Button
                        className="sm:flex hidden items-center justify-center gap-[2px] bg-[#FFFFFF] rounded-[24px] p-[4px] pr-[12px] h-fit m-0 hover:bg-[#FFFFFF] shadow-none"
                        onClick={togglePdf}
                    >
                        <Image src={CollapseContentSvg} alt="Collapse Content" />
                        <p className="text-xs font-bold text-[#5B6170]">{openPdf ? "Collapse" : "Expand"}</p>
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-center w-full flex-1 sm:px-[94px] md:px-[31px] lg:px-[39px] xl:px-[79px] px-[12px]  bg-white">
                <div ref={containerRef} className="pdf-container overflow-y-scroll h-[80vh] w-full border shadow-lg">
                    <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page key={index + 1} pageNumber={index + 1} scale={scale} />
                        ))}
                    </Document>
                </div>
            </div>
        </div>
    );
};
