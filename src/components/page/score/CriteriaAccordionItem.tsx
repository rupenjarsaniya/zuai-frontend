import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FC, useMemo } from "react";
import { CircularProgress } from "./CircularProgress";
import { ImprovementSection } from "./ImprovementSection";

interface CriteriaAccordionItemProps {
    criteriaTitle: string;
    criteriaDescription: string;
    scoreOutOf: string;
    progress: number;
    description: string;
    handleAccordionToggle: () => void;

    correctItems?: Array<{ text: string }>;
    warningItems?: Array<{ text: string }>;
}

export const CriteriaAccordionItem: FC<CriteriaAccordionItemProps> = ({
    criteriaTitle,
    criteriaDescription,
    scoreOutOf,
    progress,
    description,
    handleAccordionToggle,
    correctItems,
    warningItems,
}) => {
    const progressColor = useMemo(() => {
        if (progress <= 30) return "text-[#EB751F]"; // Red for progress <= 30
        if (progress <= 50) return "text-[#F9C94E]"; // Orange for progress <= 50
        return "text-[#3CC28A]"; // Green for progress > 50
    }, [progress]);

    return (
        <AccordionItem value={criteriaTitle} className="bg-[#FFFFFF] rounded-[24px]" onClick={handleAccordionToggle}>
            <AccordionTrigger className="py-[12px] px-[16px] hover:no-underline">
                <div className="flex items-center gap-[16px] pr-5">
                    <div className="w-[40px] h-[40px]">
                        <CircularProgress
                            progress={progress}
                            text={scoreOutOf}
                            size={40}
                            textSize="text-xs"
                            color={progressColor}
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-xs font-bold text-[#98A1BB]">{criteriaTitle}</p>
                        <h2 className="text-xl font-bold text-[#3D404B] text-start">{criteriaDescription}</h2>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-[12px] text-[#3D404B] text-sm flex flex-col justify-start">
                <hr />
                <p className="my-[16px] font-semibold text-sm">{description}</p>
                <div className="flex flex-col gap-[16px]">
                    {correctItems && correctItems.length > 0 && (
                        <ImprovementSection
                            title="Achievements"
                            items={correctItems.map((item) => ({ type: "correct", text: item.text }))}
                        />
                    )}
                    {warningItems && warningItems.length > 0 && (
                        <ImprovementSection
                            title="Scope of Improvement"
                            items={warningItems.map((item) => ({ type: "warning", text: item.text }))}
                        />
                    )}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};
