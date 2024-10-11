import Image from "next/image";
import { ChangeEvent, FC } from "react";
import UploadFileSvg from "@/assets/images/upload_file.svg";
import PreviewSvg from "@/assets/images/preview_image.svg";
import CorrectSvg from "@/assets/images/correct.svg";
import XSvg from "@/assets/images/x.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
    file: File | null;
    handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
}

export const FileUpload: FC<FileUploadProps> = ({ file, handleFileUpload, reset }) => (
    <div className="border-2 border-[#CEC4EB] border-dashed rounded-[12px] h-[240px] flex flex-col items-center justify-center gap-[20px]">
        <div className="flex flex-col items-center justify-center">
            {file ? (
                <div className="max-w-[250px] border border-[#EAF0F2] flex items-center justify-center gap-[12px] relative rounded-[12px] p-[4px] pr-[12px] select-none">
                    <Image src={PreviewSvg} alt="Preview Image" />
                    <div className="flex items-center justify-center gap-[4px]">
                        <Image src={CorrectSvg} alt="Correct" />
                        <p className="text-[#7A8196] text-sm font-semibold max-w-[150px] truncate">{file.name}</p>
                    </div>
                    <div
                        className="w-[16px] h-[16px] rounded-full border border-[#C1CCD6] flex items-center justify-center absolute -top-2 -right-2 bg-[#FFFFFF]"
                        onClick={reset}
                    >
                        <Image src={XSvg} alt="X" />
                    </div>
                </div>
            ) : (
                <>
                    <Input
                        type="file"
                        className="hidden"
                        id="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e)}
                        onFocus={(e) => e.target.blur()}
                    />
                    <Image src={UploadFileSvg} alt="Upload File" className="mb-[9px]" />
                    <div className="text-[#7A8196] font-bold text-base">Drag and drop a PDF</div>
                    <div className="text-xs text-[#7A8196]">*Limit 25 MB per file.</div>
                    <Button
                        className="mt-[20px] border-2 border-[#CEC4EB] rounded-[20px] bg-transparent text-[#6947BF] hover:bg-[#F2F0F7] hover:text-[#6947BF] text-[15px] font-extrabold"
                        onClick={() => document.getElementById("file")?.click()}
                    >
                        Upload your file
                    </Button>
                </>
            )}
        </div>
    </div>
);
