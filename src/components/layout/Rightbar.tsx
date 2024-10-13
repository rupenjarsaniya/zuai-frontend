import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import CoinSvg from "@/assets/images/coin.svg";
import FirePng from "@/assets/images/fire.png";
import EventSvg from "@/assets/images/event.svg";
import NoteStackSvg from "@/assets/images/note_stack.svg";

type IconWithTextProps = {
    iconSrc: string | StaticImageData;
    altText: string;
    value: number;
};

const IconWithText: FC<IconWithTextProps> = ({ iconSrc, altText, value }) => (
    <div className="flex items-center bg-white border border-[#EAF0F2] p-1 pr-2 rounded-full">
        <div className="w-5 h-5">
            <Image src={iconSrc} alt={altText} width={20} height={20} className="object-fill" />
        </div>
        <p className="ml-2 text-sm font-semibold text-[#5B6170]">{value}</p>
    </div>
);

type RoundIconProps = {
    iconSrc: string;
    altText: string;
};

const RoundIcon: FC<RoundIconProps> = ({ iconSrc, altText }) => (
    <div className="w-11 h-11 p-1 bg-[#FFFFFFA3] rounded-full">
        <div className="flex items-center justify-center w-full h-full bg-white border border-[#EAF0F2] p-1 rounded-full">
            <Image src={iconSrc} alt={altText} width={20} height={20} className="object-fill" />
        </div>
    </div>
);

export const Rightbar: FC = () => {
    return (
        <div className="hidden sm:flex flex-col items-end gap-3 p-3 w-[86px] rounded-[16px]">
            <div className="flex flex-col items-end gap-1">
                <IconWithText iconSrc={CoinSvg} altText="Coin" value={120} />
                <IconWithText iconSrc={FirePng} altText="Streak" value={24} />
            </div>
            <RoundIcon iconSrc={EventSvg} altText="Event" />
            <RoundIcon iconSrc={NoteStackSvg} altText="NoteStack" />
        </div>
    );
};
