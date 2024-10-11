import { FC } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import StarSvg from "@/assets/images/star.svg";

export const EvaluateScoreButton: FC = () => (
    <Button className="w-[245px] border rounded-[24px] bg-[#6947BF] text-[#5B6170] pt-[8px] pb-[8px] pl-[8px] flex items-center justify-start gap-[8px] hover:bg-[#6947BF] hover:text-white mt-[32px]">
        <Image src={StarSvg} alt="Star" />
        <span className="text-white text-lg font-bold">Evaluate your Score</span>
    </Button>
);
