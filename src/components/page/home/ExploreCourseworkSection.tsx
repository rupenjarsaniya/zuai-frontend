import { FC, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseWorkItem } from "./CourseWorkItem";
import A4Svg from "@/assets/images/A4.svg";
import UserLabelSvg from "@/assets/images/userlabel.svg";
import StarSvg from "@/assets/images/star_tag.svg";
import WordsSvg from "@/assets/images/words.svg";
import WatchSvg from "@/assets/images/watch.svg";
import HandSvg from "@/assets/images/hand.svg";
import { Coursework, TabType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { ListOfTabs } from "@/data";

interface ExploreCourseworkSectionProps {
    selectedTab: TabType;
    setSelectedTab: (tab: TabType) => void;
    courseworks: Coursework[];
    handleDeleteCoursework: (id: string) => void;
}

export const ExploreCourseworkSection: FC<ExploreCourseworkSectionProps> = ({
    selectedTab,
    setSelectedTab,
    courseworks,
    handleDeleteCoursework,
}) => {
    const router = useRouter();

    const filteredCourseworks = useMemo(() => {
        if (selectedTab === "all") {
            return courseworks;
        }

        return courseworks.filter((coursework) => coursework.category === selectedTab);
    }, [courseworks, selectedTab]);

    const renderCourseworks = (items: Coursework[]) =>
        items.length > 0 ? (
            items.map((coursework) => (
                <CourseWorkItem
                    key={coursework.id}
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
        );

    return (
        <div className="flex flex-col gap-[12px]">
            <h2 className="text-[#5B6170] text-xl font-bold">Explore coursework</h2>
            <Tabs value={selectedTab}>
                <TabsList className="bg-transparent mb-[10px] flex-wrap h-fit justify-start gap-[6px]">
                    {ListOfTabs.map((tab) => (
                        <TabsTrigger
                            key={tab.id}
                            value={tab.id}
                            className="text-base data-[state=active]:text-[#6947BF] data-[state=active]:font-semibold data-[state=active]:bg-[#FFFFFFA3] rounded-[12px] text-[#98A1BB] font-bold"
                            onClick={() => setSelectedTab(tab.id)}
                        >
                            {tab.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {ListOfTabs.map((tab) => (
                    <TabsContent key={tab.id} value={tab.id} className="flex flex-wrap gap-[16px]">
                        {renderCourseworks(filteredCourseworks)}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};
