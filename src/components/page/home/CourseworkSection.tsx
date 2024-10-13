import { FC } from "react";
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

interface CourseworkSectionProps {
    courseworks: Coursework[];
    totalCourseworks: number;
    handleViewAll: () => void;
    handleDeleteCoursework: (id: string) => void;
}

export const CourseworkSection: FC<CourseworkSectionProps> = ({
    courseworks,
    totalCourseworks,
    handleViewAll,
    handleDeleteCoursework,
}) => {
    const router = useRouter();

    const handleViewAllClick = () => {
        handleViewAll();
        document.getElementById("explore-coursework-section")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="flex flex-col gap-[12px]">
            <h2 className="text-[#5B6170] text-xl font-bold">My coursework</h2>
            <div className="flex flex-wrap gap-[16px]">
                {courseworks.length > 0 ? (
                    courseworks.map((coursework, index) => (
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
                            handleDelete={() => handleDeleteCoursework(coursework.id)}
                        />
                    ))
                ) : (
                    <div className="flex items-center justify-center w-full h-[200px] bg-[#F4F5F7] rounded-[12px]">
                        <p className="text-[#7A8196] text-sm font-semibold">No coursework available</p>
                    </div>
                )}
            </div>
            {totalCourseworks > 2 && (
                <Button
                    className="text-base font-bold text-[#98A1BB] cursor-pointer bg-transparent shadow-none hover:bg-transparent"
                    role="button"
                    onClick={handleViewAllClick}
                >
                    View all
                </Button>
            )}
        </div>
    );
};
