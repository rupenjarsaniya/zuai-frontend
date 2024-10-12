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
import { getCourseworkById } from "@/services/api.service";

const ActionButton: FC<{ onClick: () => void; text: string }> = ({ onClick, text }) => (
    <Button className="bg-[#FFFFFF] hover:bg-[#FFFFFF] flex items-center gap-[4px] rounded-[24px] w-fit" onClick={onClick}>
        <p className="text-base font-extrabold text-[#6947BF]">{text}</p>
        <Image src={ArrowRightSvg} alt="Arrow Right" />
    </Button>
);

const Score: FC = () => {
    const params = useParams();
    const { isSm, isMd, is2xl, isLg, isXl } = useBreakpoints();
    const [openPdf, setOpenPdf] = useState(false);
    const [openAccordionIndex, setOpenAccordionIndex] = useState<string | null>(null);
    const [coursework, setCoursework] = useState<Coursework | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isAccordionOpen = useMemo(() => openAccordionIndex !== null, [openAccordionIndex]);

    const handleAccordionToggle = (index: string) => {
        setOpenAccordionIndex((prev) => (prev === index ? null : index));
        // This condition is to collapse the accordion when the screen size is large, and the accordion is open
        setIsCollapsed((isLg || isXl || is2xl) && openAccordionIndex !== index);
    };

    const togglePdf = () => {
        setOpenPdf((prev) => !prev);
        // This condition exists because the accordion should not be opened when the pdf is opened
        if (isLg) {
            setOpenAccordionIndex(null);
        }
        setIsCollapsed(false);
    };

    const handleCollapseAndExpand = () => {
        // This condition exists because the accordion should not be opened when the pdf is opened
        if (isXl || is2xl) {
            setOpenAccordionIndex((prev) => (prev === null ? "Criteria A:" : null));
        }
        setIsCollapsed((prev) => !prev);
    };

    const remark = useMemo(() => {
        if (!coursework) return { textColor: "", text: "-" };

        const percentage = (coursework?.marks * 100) / 20;
        if (percentage <= 30) return { textColor: "text-[#EB751F]", text: "Poor" };
        if (percentage <= 50) return { textColor: "text-[#F9C94E]", text: "Average" };
        return { textColor: "text-[#3CC28A]", text: "Good" };
    }, [coursework]);

    useEffect(() => {
        // This condition exists because the pdf should be closed when the accordion is open and the screen size is large
        if (isLg && isAccordionOpen && openPdf) {
            setOpenPdf(false);
        }
    }, [isAccordionOpen, isLg, openPdf]);

    useEffect(() => {
        const _coursework = getCourseworkById(params.id as string);
        setCoursework(_coursework);
    }, [params.id]);

    const renderPdfViewer = (alwaysShow = false) =>
        (alwaysShow || openPdf) && coursework ? (
            <PdfViewer
                pdfUrl={coursework.file}
                fileName={coursework.fileName}
                handleClose={togglePdf}
                handleCollapseAndExpand={handleCollapseAndExpand}
                isCollapsed={isCollapsed}
            />
        ) : null;

    if (!coursework) {
        return null;
    }

    return (
        <main className="flex flex-col gap-8 row-start-2 items-center">
            <div className="max-w-[1099px] w-full mt-[64px] mb-[180px]">
                <div className="flex gap-[16px] items-start">
                    {(is2xl || isXl || (isLg && openPdf)) && renderPdfViewer(true)}

                    <div
                        className={`flex flex-col gap-[14px] ${isAccordionOpen ? "lg:w-[520px] xl:w-[560px]" : "lg:w-[356px]"} ${isLg ? (!openPdf ? "w-full" : "") : "w-full"}`}
                    >
                        {(isMd || isLg) && !openPdf && <FileCard fileName={coursework.fileName} setOpenPdf={togglePdf} />}

                        {isMd && openPdf && renderPdfViewer()}

                        <ScoreCard
                            title="Overall Score"
                            scoreText={remark.text}
                            scoreTextColor={remark.textColor}
                            date={moment(coursework.evaluatedDate, "X").format("DD MMM YYYY")}
                            progress={(coursework.marks * 100) / 20}
                            scoreOutOf={coursework.marks + "/20"}
                        />

                        {isSm &&
                            (openPdf ? (
                                <ActionButton onClick={togglePdf} text="Check detailed Evaluation" />
                            ) : (
                                <ActionButton onClick={togglePdf} text="Expand & view your file" />
                            ))}

                        {isSm && renderPdfViewer()}

                        {!isSm || !openPdf ? (
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
                                        handleAccordionToggle={() => handleAccordionToggle("Criteria A:")}
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
                                        handleAccordionToggle={() => handleAccordionToggle("Criteria B:")}
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
                                        handleAccordionToggle={() => handleAccordionToggle("Criteria C:")}
                                    />
                                </Accordion>

                                {(is2xl || isXl || (isLg && openPdf)) && (
                                    <ActionButton onClick={togglePdf} text="Check detailed Evaluation" />
                                )}
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Score;
