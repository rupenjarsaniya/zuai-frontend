import { FC, useEffect, useState } from "react";
import { CourseWorkItem } from "./CourseWorkItem";
import UserLabelSvg from "@/assets/images/userlabel.svg";
import StarSvg from "@/assets/images/star_tag.svg";
import WordsSvg from "@/assets/images/words.svg";
import WatchSvg from "@/assets/images/watch.svg";
import HandSvg from "@/assets/images/hand.svg";
import A4Svg from "@/assets/images/A4.svg";
import { Button } from "@/components/ui/button";
import { Coursework } from "@/lib/types";
import { useRouter } from "next/navigation";

export const CourseworkSection: FC = () => {
    const router = useRouter();
    const [coursework, setCoursework] = useState<Coursework[]>([]);

    useEffect(() => {
        const metadata = localStorage.getItem("coursework_zuai") || "[]";
        const metadataArray = JSON.parse(metadata) as Coursework[];
        setCoursework(metadataArray);
    }, []);

    return (
        <div className="flex flex-col gap-[12px]">
            <h2 className="text-[#5B6170] text-xl font-bold">My coursework</h2>
            <div className="flex flex-wrap gap-[16px]">
                {coursework.map((coursework, index) => (
                    <CourseWorkItem
                        key={index}
                        title={coursework.title}
                        description={coursework.description}
                        previewImage={A4Svg}
                        tags={[
                            { image: UserLabelSvg, title: coursework.tags.subject },
                            { image: StarSvg, title: `${coursework.tags.star} / 7` },
                            { image: WordsSvg, title: `${coursework.tags.wordCount} words` },
                            { image: WatchSvg, title: `${coursework.tags.readMins} min read` },
                            { image: HandSvg, title: coursework.tags.language },
                        ]}
                        onClick={() => router.push(`/score/${coursework.id}`)}
                    />
                ))}
            </div>
            <Button
                className="text-base font-bold text-[#98A1BB] cursor-pointer bg-transparent shadow-none hover:bg-transparent"
                role="button"
            >
                View all
            </Button>
        </div>
    );
};
