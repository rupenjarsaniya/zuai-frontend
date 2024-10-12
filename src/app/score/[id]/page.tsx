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
    const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);
    const [coursework, setCoursework] = useState<Coursework | undefined>(undefined);

    const isAccordionOpen = openAccordionIndex !== null;

    const handleAccordionToggle = (index: number) => {
        setOpenAccordionIndex(openAccordionIndex === index ? null : index);
    };

    const handlePdfToggle = () => {
        setOpenPdf((prev) => !prev);
    };

    const renderPdfViewer = (alwaysShow = false) =>
        (alwaysShow || openPdf) && coursework ? (
            <PdfViewer pdfUrl={coursework.file} fileName={coursework.fileName} handleClose={handlePdfToggle} />
        ) : null;

    const remark = useMemo(() => {
        if (!coursework) {
            return { textColor: "", text: "-" };
        }

        const percentage = (coursework?.marks * 100) / 20;

        if (percentage <= 30) return { textColor: "text-[#EB751F]", text: "Poor" };
        if (percentage <= 50) return { textColor: "text-[#F9C94E]", text: "Average" };
        return { textColor: "text-[#3CC28A]", text: "Good" };
    }, [coursework]);

    useEffect(() => {
        if (isLg && isAccordionOpen && openPdf) {
            setOpenPdf(false);
        }
    }, [isAccordionOpen, isLg, openPdf]);

    useEffect(() => {
        const metadata = localStorage.getItem("coursework_zuai") || "[]";
        const metadataArray = JSON.parse(metadata) as Coursework[];
        const _coursework = metadataArray.find((coursework) => coursework.id === params.id);
        setCoursework(_coursework);
    }, [params.id]);

    if (typeof Promise.withResolvers === "undefined") {
        if (typeof window !== "undefined") {
            // @ts-expect-error This does not exist outside of polyfill which this is doing
            window.Promise.withResolvers = function () {
                let resolve, reject;
                const promise = new Promise((res, rej) => {
                    resolve = res;
                    reject = rej;
                });
                return { promise, resolve, reject };
            };
        } else {
            // @ts-expect-error This does not exist outside of polyfill which this is doing
            global.Promise.withResolvers = function () {
                let resolve, reject;
                const promise = new Promise((res, rej) => {
                    resolve = res;
                    reject = rej;
                });
                return { promise, resolve, reject };
            };
        }
    }

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
                        {(isMd || isLg) && !openPdf && (
                            <FileCard fileName={coursework.fileName} setOpenPdf={handlePdfToggle} />
                        )}

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
                                <ActionButton onClick={handlePdfToggle} text="Check detailed Evaluation" />
                            ) : (
                                <ActionButton onClick={handlePdfToggle} text="Expand & view your file" />
                            ))}

                        {isSm && renderPdfViewer()}

                        {!isSm || !openPdf ? (
                            <>
                                <Accordion type="single" collapsible className="w-full flex flex-col gap-[8px]">
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
                                        handleAccordionToggle={() => handleAccordionToggle(0)}
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
                                        handleAccordionToggle={() => handleAccordionToggle(1)}
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
                                        handleAccordionToggle={() => handleAccordionToggle(2)}
                                    />
                                </Accordion>

                                {(is2xl || isXl || (isLg && openPdf)) && (
                                    <ActionButton onClick={handlePdfToggle} text="Check detailed Evaluation" />
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
