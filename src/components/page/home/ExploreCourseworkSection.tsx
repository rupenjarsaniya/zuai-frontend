import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseWorkItem } from "./CourseWorkItem";
import A4Svg from "@/assets/images/A4.svg";
import UserLabelSvg from "@/assets/images/userlabel.svg";
import { TabTypes } from "@/lib/types";

export const ListOfTabs: { id: TabTypes; name: string }[] = [
    { id: "all", name: "All" },
    { id: "ia_example", name: "IA Example" },
    { id: "ee_example", name: "EE Example" },
    { id: "io_example", name: "IO Example" },
    { id: "tok_example", name: "Tok Example" },
];

interface ExploreCourseworkSectionProps {
    selectedTab: TabTypes;
    setSelectedTab: (tab: TabTypes) => void;
}

export const ExploreCourseworkSection: FC<ExploreCourseworkSectionProps> = ({ selectedTab, setSelectedTab }) => (
    <div className="flex flex-col gap-[12px]">
        <h2 className="text-[#5B6170] text-xl font-bold">Explore coursework</h2>
        <Tabs defaultValue={selectedTab}>
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

            <TabsContent value="all">
                <CourseWorkItem
                    title="How does the temperature of a Copper pipe affect..."
                    description="This coursework explores the effect of temperature on copper pipes and magnet behavior..."
                    previewImage={A4Svg}
                    tags={[
                        { image: UserLabelSvg, title: "Physics HL" },
                        { image: UserLabelSvg, title: "Physics HL" },
                    ]}
                    onClick={() => {}}
                />
            </TabsContent>

            <TabsContent value="ia_example">
                <p className="text-lg">This is an IA Example tab content, showing more IA examples...</p>
            </TabsContent>

            <TabsContent value="ee_example">
                <p className="text-lg">This is an EE Example tab content, exploring EE examples...</p>
            </TabsContent>

            <TabsContent value="io_example">
                <p className="text-lg">This is an IO Example tab content, showcasing IO details...</p>
            </TabsContent>

            <TabsContent value="tok_example">
                <p className="text-lg">This is a TOK Example tab content, discussing TOK examples...</p>
            </TabsContent>
        </Tabs>
    </div>
);
