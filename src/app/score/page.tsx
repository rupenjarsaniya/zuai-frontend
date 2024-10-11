"use client";

import { FC, useEffect, useState } from "react";
import { CriteriaAccordionItem, FileCard, PdfViewer, ScoreCard } from "@/components/page/score";
import ArrowRightSvg from "@/assets/images/arrow_right.svg";
import Image from "next/image";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import useBreakpoints from "@/hook/useBreakpoint";

const ActionButton: FC<{ onClick: () => void; text: string }> = ({ onClick, text }) => (
    <Button className="bg-[#FFFFFF] hover:bg-[#FFFFFF] flex items-center gap-[4px] rounded-[24px] w-fit" onClick={onClick}>
        <p className="text-base font-extrabold text-[#6947BF]">{text}</p>
        <Image src={ArrowRightSvg} alt="Arrow Right" />
    </Button>
);

const Score: FC = () => {
    const { isSm, isMd, is2xl, isLg, isXl } = useBreakpoints();
    const [openPdf, setOpenPdf] = useState(false);
    const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);
    const [pdfUrl, setPdfUrl] = useState("");

    const isAccordionOpen = openAccordionIndex !== null;

    const handleAccordionToggle = (index: number) => {
        setOpenAccordionIndex(openAccordionIndex === index ? null : index);
    };

    const handlePdfToggle = () => {
        setOpenPdf((prev) => !prev);
    };

    const renderPdfViewer = (alwaysShow = false) =>
        alwaysShow || openPdf ? <PdfViewer pdfUrl={pdfUrl} handleClose={handlePdfToggle} /> : null;

    useEffect(() => {
        if (isLg && isAccordionOpen && openPdf) {
            setOpenPdf(false);
        }
    }, [isAccordionOpen, isLg, openPdf]);

    useEffect(() => {
        const pdfFile = localStorage.getItem("pdfFile");
        if (pdfFile) {
            setPdfUrl(pdfFile);
        }
    }, []);

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

    return (
        <main className="flex flex-col gap-8 row-start-2 items-center">
            <div className="max-w-[1099px] w-full mt-[64px] mb-[180px]">
                <div className="flex gap-[16px] items-start">
                    {(is2xl || isXl || (isLg && openPdf)) && renderPdfViewer(true)}

                    <div
                        className={`flex flex-col gap-[14px] ${isAccordionOpen ? "lg:w-[520px] xl:w-[560px]" : "lg:w-[356px]"} ${isLg ? (!openPdf ? "w-full" : "") : "w-full"}`}
                    >
                        {(isMd || isLg) && !openPdf && (
                            <FileCard fileName="IB Economic Paper IA2.pdf" setOpenPdf={handlePdfToggle} />
                        )}

                        {isMd && openPdf && renderPdfViewer()}

                        <ScoreCard
                            title="Overall Score"
                            scoreText="Good"
                            date="12 Jul 2024"
                            progress={(13 * 100) / 20}
                            scoreOutOf="13/20"
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
                                        scoreOutOf="7/10"
                                        progress={(7 * 100) / 10}
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
                                        scoreOutOf="5/10"
                                        progress={(5 * 100) / 10}
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
                                        scoreOutOf="3/10"
                                        progress={(3 * 100) / 10}
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
