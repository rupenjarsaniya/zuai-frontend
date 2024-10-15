import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ArrowRightSvg from "@/assets/images/arrow_right.svg";
import Image from "next/image";
import { FC, MouseEventHandler } from "react";

interface FileCardProps {
    fileName: string;
    setOpenPdf: MouseEventHandler<HTMLButtonElement>;
}

export const FileCard: FC<FileCardProps> = ({ fileName, setOpenPdf }) => (
    <Card className="bg-[#FFFFFF] rounded-[24px] sm:w-full w-fit sm:px-[16px] sm:py-[9px] px-[16px] py-[8px]">
        <CardContent className="flex items-center justify-between gap-[20px] p-0">
            <p className="sm:block hidden font-semibold text-sm text-[#5B6170] bg-[#98A1BB1F] rounded-[12px] px-[12px] py-[4px] w-[216px] truncate">
                {fileName}
            </p>
            <Button
                className="bg-transparent hover:bg-transparent shadow-none flex items-center gap-[4px] p-0 m-0 h-fit"
                onClick={setOpenPdf}
            >
                <p className="text-base font-extrabold text-[#6947BF]">Expand & view your file</p>
                <Image src={ArrowRightSvg} alt="Arrow Right" />
            </Button>
        </CardContent>
    </Card>
);
