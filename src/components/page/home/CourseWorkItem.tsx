import { FC } from "react";
import Image from "next/image";
import { randomNumber } from "@/lib/utils";

type Tags = {
    image: string;
    title: string;
};

interface CourseWorkItemProps {
    title: string;
    description: string;
    previewImage: string;
    tags: Tags[];
}

export const CourseWorkItem: FC<CourseWorkItemProps> = ({ description, title, previewImage, tags }) => (
    <div className={`w-[440px] p-[6px] flex gap-[8px] rounded-[12px] border border-[#F4EAD8] workcard-${randomNumber()}`}>
        <div className="max-w-[120px] w-full h-[160px] rounded-[8px] border border-[#EAF0F2] [box-shadow:0px_0.72px_2.15px_-0.36px_#0000001F] bg-[#FFFFFF] flex items-center justify-center p-[9px]">
            <Image src={previewImage} alt="A4" />
        </div>
        <div className="flex flex-col">
            <h2 className="text-lg font-extrabold	text-[#3D404B]">{title}</h2>
            <p className="text-[11px] font-semibold text-[#7A8196] mt-[4px] mb-[6px]">{description}</p>
            <div className="flex items-center flex-wrap gap-[4px]">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-[3px] p-[2px] pr-[8px] bg-[#FFFFFF] w-fit rounded-full"
                    >
                        <div className="w-[16px] h-[16px] flex items-center justify-center">
                            <Image src={tag.image} alt="User Label" className="object-fill" />
                        </div>
                        <span className="text-[#5B6170] text-[11px] font-bold">{tag.title}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
