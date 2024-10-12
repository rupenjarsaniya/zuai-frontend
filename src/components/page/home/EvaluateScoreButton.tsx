import { FC } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import StarSvg from "@/assets/images/star.svg";

interface EvaluateScoreButtonProps {
    handleSubmit: () => void;
    disabled: boolean;
}

export const EvaluateScoreButton: FC<EvaluateScoreButtonProps> = ({ handleSubmit, disabled }) => (
    <Button
        className="mt-[32px] lg:ml-0 lg:mr-0 ml-auto mr-auto sm:w-[245px] w-full border rounded-[24px] bg-[#6947BF] text-[#5B6170] pt-[8px] pb-[8px] pl-[8px] flex items-center sm:justify-start justify-center gap-[8px] hover:bg-[#6947BF] hover:text-white"
        onClick={handleSubmit}
        disabled={disabled}
    >
        <Image src={StarSvg} alt="Star" />
        <span className="text-white text-lg font-bold">Evaluate your Score</span>
    </Button>
);
