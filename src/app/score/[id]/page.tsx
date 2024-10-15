"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { CriteriaAccordionItem, FileCard, PdfViewer, ScoreCard } from "@/components/page/score";
import ArrowRightSvg from "@/assets/images/arrow_right.svg";
import Image from "next/image";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import useBreakpoints from "@/hook/useBreakpoint";
import { useParams } from "next/navigation";
import { Coursework } from "@/lib/types";
import moment from "moment";
import { useCourseworkStore } from "@/zustand/courseworkStore";

const ActionButton: FC<{ onClick: () => void; text: string }> = ({ onClick, text }) => (
    <Button className="bg-[#FFFFFF] hover:bg-[#FFFFFF] flex items-center gap-[4px] rounded-[24px] w-fit" onClick={onClick}>
        <p className="text-base font-extrabold text-[#6947BF]">{text}</p>
        <Image src={ArrowRightSvg} alt="Arrow Right" />
    </Button>
);

const Score: FC = () => {
    const { id } = useParams();
    const { isSm, isMd, is2xl, isLg, isXl } = useBreakpoints();
    const { getCourseworkById } = useCourseworkStore();

    const [isPdfOpen, setIsPdfOpen] = useState(true);
    const [coursework, setCoursework] = useState<Coursework | undefined>(undefined);
    const [openAccordionIndex, setOpenAccordionIndex] = useState<string | null>(null);

    const isAccordionOpen = useMemo(() => openAccordionIndex !== null, [openAccordionIndex]);

    const remark = useMemo(() => {
        if (!coursework) return { textColor: "", text: "-" };

        const percentage = (coursework?.marks * 100) / 30;
        if (percentage <= 30) return { textColor: "text-[#EB751F]", text: "Poor" };
        if (percentage <= 50) return { textColor: "text-[#F9C94E]", text: "Average" };
        return { textColor: "text-[#3CC28A]", text: "Good" };
    }, [coursework]);

    useEffect(() => {
        const _coursework = getCourseworkById(id as string);
        setCoursework(_coursework);
    }, [getCourseworkById, id]);

    const toggleAccordion = (index: string) => {
        const isSameIndex = openAccordionIndex === index;
        if (isXl || is2xl) {
            if (isSameIndex) {
                setIsPdfOpen(true);
            } else {
                setIsPdfOpen(false);
            }
        }

        if (isLg && isPdfOpen) {
            setIsPdfOpen(false);
        }

        setOpenAccordionIndex(isSameIndex ? null : index);
    };

    const handleOpenPdf = () => {
        setOpenAccordionIndex(null);
        setIsPdfOpen(true);
    };

    const handleClosePdf = () => {
        setIsPdfOpen(false);
        if (isXl || is2xl) {
            setOpenAccordionIndex("Criteria A:"); // Open first accordion by default
        }
    };

    const renderPdfViewer = (alwaysShow = false) =>
        (alwaysShow || isPdfOpen) && coursework ? (
            <div
                className={`${isPdfOpen ? "2xl:max-w-[972px] xl:max-w-[858px] lg:max-w-[638px] md:max-w-[482px]" : "2xl:max-w-[500px] xl:max-w-[500px] lg:max-w-[500px]"} w-full`}
            >
                <PdfViewer
                    pdfUrl={coursework.file}
                    fileName={coursework.fileName}
                    handleClose={handleClosePdf}
                    handleOpen={handleOpenPdf}
                    isPdfOpen={isPdfOpen}
                />
            </div>
        ) : null;

    if (!coursework) {
        return null;
    }

    return (
        <main className="flex flex-col gap-8 row-start-2 items-center">
            <div className="2xl:max-w-[1400px] w-full sm:px-[24px] px-[12px] sm:mt-[64px] mt-[24px] mb-[40px]">
                <div className="flex gap-[16px] items-start">
                    {isLg && renderPdfViewer()}
                    {(isXl || is2xl) && renderPdfViewer(true)}

                    <div className={`flex flex-col gap-[14px] w-full`}>
                        {(isMd || isLg) && !isPdfOpen && (
                            <FileCard fileName={coursework.fileName} setOpenPdf={() => handleOpenPdf()} />
                        )}
                        {isMd && isPdfOpen && renderPdfViewer()}

                        <ScoreCard
                            title="Overall Score"
                            scoreText={remark.text}
                            scoreTextColor={remark.textColor}
                            date={moment(coursework.evaluatedDate, "X").format("DD MMM YYYY")}
                            progress={(coursework.marks * 100) / 30}
                            scoreOutOf={coursework.marks + "/30"}
                        />

                        {isSm &&
                            (isPdfOpen ? (
                                <ActionButton onClick={handleClosePdf} text="Check detailed Evaluation" />
                            ) : (
                                <ActionButton onClick={handleOpenPdf} text="Expand & view your file" />
                            ))}

                        {isSm && renderPdfViewer()}

                        {isSm && isPdfOpen ? null : (
                            <>
                                <Accordion
                                    type="single"
                                    collapsible
                                    value={openAccordionIndex as string}
                                    className="w-full flex flex-col gap-[8px]"
                                >
                                    <CriteriaAccordionItem
                                        criteriaTitle="Criteria A:"
                                        criteriaDescription="Understanding Knowledge Questions"
                                        scoreOutOf={`${coursework.criteriaA}/10`}
                                        progress={(coursework.criteriaA * 100) / 10}
                                        description="The essay identifies and focuses on the knowledge question regarding the resolvability of disputes over knowledge claims within disciplines."
                                        correctItems={[
                                            {
                                                text: "Demonstrates a good understanding of the prescribed title and the associated knowledge questions.",
                                            },
                                            {
                                                text: "Demonstrates a clear connection between knowledge claims and questions.",
                                            },
                                        ]}
                                        warningItems={[
                                            { text: "Needs to strengthen the arguments supporting knowledge questions." },
                                            { text: "Should consider alternative perspectives in resolving disputes." },
                                        ]}
                                        handleAccordionToggle={() => toggleAccordion("Criteria A:")}
                                        isOpen={isAccordionOpen}
                                    />
                                    <CriteriaAccordionItem
                                        criteriaTitle="Criteria B:"
                                        criteriaDescription="Understanding Knowledge Questions"
                                        scoreOutOf={`${coursework.criteriaB}/10`}
                                        progress={(coursework.criteriaB * 100) / 10}
                                        description="The essay identifies and focuses on the knowledge question regarding the resolvability of disputes over knowledge claims within disciplines."
                                        correctItems={[
                                            {
                                                text: "Demonstrates a good understanding of the prescribed title and the associated knowledge questions.",
                                            },
                                            {
                                                text: "Demonstrates a clear connection between knowledge claims and questions.",
                                            },
                                        ]}
                                        warningItems={[
                                            { text: "Needs to strengthen the arguments supporting knowledge questions." },
                                            { text: "Should consider alternative perspectives in resolving disputes." },
                                        ]}
                                        handleAccordionToggle={() => toggleAccordion("Criteria B:")}
                                        isOpen={isAccordionOpen}
                                    />
                                    <CriteriaAccordionItem
                                        criteriaTitle="Criteria C:"
                                        criteriaDescription="Understanding Knowledge Questions"
                                        scoreOutOf={`${coursework.criteriaC}/10`}
                                        progress={(coursework.criteriaC * 100) / 10}
                                        description="The essay identifies and focuses on the knowledge question regarding the resolvability of disputes over knowledge claims within disciplines."
                                        correctItems={[
                                            {
                                                text: "Demonstrates a good understanding of the prescribed title and the associated knowledge questions.",
                                            },
                                            {
                                                text: "Demonstrates a clear connection between knowledge claims and questions.",
                                            },
                                        ]}
                                        warningItems={[
                                            { text: "Needs to strengthen the arguments supporting knowledge questions." },
                                            { text: "Should consider alternative perspectives in resolving disputes." },
                                        ]}
                                        handleAccordionToggle={() => toggleAccordion("Criteria C:")}
                                        isOpen={isAccordionOpen}
                                    />
                                </Accordion>

                                {(is2xl || isXl || (isLg && isPdfOpen)) && (
                                    <ActionButton onClick={handleClosePdf} text="Check detailed Evaluation" />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Score;
