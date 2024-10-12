import { FC, MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import { randomNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Tags = {
    image: string;
    title: string | number;
};

interface CourseWorkItemProps {
    title: string;
    description: string;
    previewImage: string;
    tags: Tags[];
    onClick: () => void;
    handleDelete: () => void;
}

export const CourseWorkItem: FC<CourseWorkItemProps> = ({
    description,
    title,
    previewImage,
    tags,
    onClick,
    handleDelete,
}) => {
    const [workcard, setWorkcard] = useState("workcard-1");

    const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent the event from bubbling up to the parent div
        handleDelete();
    };

    useEffect(() => {
        const number = randomNumber();
        setWorkcard(`workcard-${number}`);
    }, []);

    return (
        <div
            className={`sm:w-[440px] w-full p-[6px] flex gap-[8px] rounded-[12px] border border-[#F4EAD8] cursor-pointer ${workcard}`}
            onClick={onClick}
        >
            <div className="hidden lg:flex max-w-[120px] w-full h-[160px] rounded-[8px] border border-[#EAF0F2] [box-shadow:0px_0.72px_2.15px_-0.36px_#0000001F] bg-[#FFFFFF] items-center justify-center p-[9px]">
                <Image src={previewImage} alt="A4" />
            </div>
            <div className="flex flex-col">
                <h2 className="text-lg font-extrabold text-[#3D404B] line-clamp-2">{title}</h2>
                <p className="text-[11px] font-semibold text-[#7A8196] mt-[4px] mb-[6px] line-clamp-2">{description}</p>
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

                <Button
                    className="rounded-[24px] w-fit h-fit m-0 mt-[12px] px-[8px] py-0 text-sm"
                    onClick={handleDeleteClick}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};
