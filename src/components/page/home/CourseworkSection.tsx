import { FC } from "react";
import { CourseWorkItem } from "./CourseWorkItem";
import UserLabelSvg from "@/assets/images/userlabel.svg";
import A4Svg from "@/assets/images/A4.svg";
import { Button } from "@/components/ui/button";

export const CourseworkSection: FC = () => (
    <div className="flex flex-col gap-[12px]">
        <h2 className="text-[#5B6170] text-xl font-bold">My coursework</h2>
        <div className="flex flex-wrap gap-[16px]">
            <CourseWorkItem
                title="How does the temperature of a Copp How does the temperature of a Copp How does the temperature of a Copp"
                description="How does the temperature of a Copper pipe affect the time it takes a magnet to fall thought takes a magnet to fall thought takes a magnet to fall thoughts"
                previewImage={A4Svg}
                tags={[
                    { image: UserLabelSvg, title: "Physics HL" },
                    { image: UserLabelSvg, title: "Physics HL" },
                ]}
            />
            <CourseWorkItem
                title="How does the temperature of a Copp"
                description="How does the temperature of a Copper pipe affect the time it takes a magnet to fall thought"
                previewImage={A4Svg}
                tags={[
                    { image: UserLabelSvg, title: "Physics HL" },
                    { image: UserLabelSvg, title: "Physics HL" },
                ]}
            />
        </div>
        <Button
            className="text-base font-bold text-[#98A1BB] cursor-pointer bg-transparent shadow-none hover:bg-transparent"
            role="button"
        >
            View all
        </Button>
    </div>
);
