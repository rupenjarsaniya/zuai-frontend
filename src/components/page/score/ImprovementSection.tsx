import Image from "next/image";
import CorrectSvg from "@/assets/images/correct.svg";
import WarningSvg from "@/assets/images/warning_circle.svg";
import { FC } from "react";

interface ImprovementSectionProps {
    title: string;
    items: Array<{ type: "correct" | "warning"; text: string }>;
}

export const ImprovementSection: FC<ImprovementSectionProps> = ({ title, items }) => (
    <div className="flex flex-col gap-[8px]">
        <h2 className="font-extrabold text-xl">{title}</h2>
        <div
            className={`border ${title === "Scope of Improvement" ? "border-[#F9C94E80]" : "border-[#3CC28AB8]"} rounded-[16px] p-[16px] ${title === "Scope of Improvement" ? "bg-[#F9C94E05]" : "bg-[#3CC28A05]"} flex flex-col gap-[8px]`}
        >
            {items.map((item: { type: "correct" | "warning"; text: string }, index: number) => (
                <div key={index} className="flex gap-[12px] items-start">
                    <Image src={item.type === "correct" ? CorrectSvg : WarningSvg} alt={item.type} className="mt-[2px]" />
                    <p className="text-sm font-bold">{item.text}</p>
                </div>
            ))}
        </div>
    </div>
);
