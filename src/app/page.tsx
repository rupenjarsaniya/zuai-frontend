"use client";

import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "react-toastify";
import {
    EssayTitleInput,
    RightCard,
    CourseAndSubjectSelection,
    Header,
    FileUpload,
    EvaluateScoreButton,
    CourseworkSection,
    ExploreCourseworkSection,
} from "@/components/page/home";
import { Course, Coursework, Subject, TabType, TabTypeValues } from "@/lib/types";
import moment from "moment";
import { countPdfWords, fileToBase64 } from "@/lib/pdf";
import { clearAllCourseworks, getCourseworks, removeCoursework, saveCoursework } from "@/services/api.service";
import { ClearLocalstorageDialog } from "@/components/page/home/ClearLocalstorageDialog";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(`pdfjs-dist/build/pdf.worker.min.mjs`, import.meta.url).toString();

const courses: Course[] = [
    { id: "maths", name: "Maths" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
];

const subjects: Subject[] = [
    { id: "maths", name: "Maths" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
];

const Home: FC = () => {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [essayTitle, setEssayTitle] = useState("");
    const [error, setError] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [selectedTab, setSelectedTab] = useState<TabType>("all");
    const [courseworks, setCourseworks] = useState<Coursework[]>([]);

    const disabled = useMemo(
        () => !selectedCourse || !selectedSubject || !essayTitle || !file,
        [selectedCourse, selectedSubject, essayTitle, file],
    );

    const fetchCourseworks = () => {
        const _coursework = getCourseworks();
        setCourseworks(_coursework);
    };

    const handleDeleteCoursework = (id: string) => {
        removeCoursework(id);
        fetchCourseworks();
    };

    const handleClearAllCourseworks = () => {
        clearAllCourseworks();
        fetchCourseworks();
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];

        if (uploadedFile) {
            if (uploadedFile.size > 25 * 1024 * 1024) {
                toast("File size should be less than 25 MB", { type: "error" });
                return;
            }
            if (uploadedFile.type !== "application/pdf") {
                toast("File should be of type PDF", { type: "error" });
                return;
            }

            setFile(uploadedFile);
        }
    };

    const saveMetadata = async () => {
        try {
            if (!selectedCourse || !selectedSubject || !essayTitle || !file) {
                setError("Please fill all the fields");
                return;
            }

            const subject = subjects.find((subject) => subject.id === selectedSubject)?.name || "";
            if (!subject) {
                setError("Invalid subject");
                return;
            }

            const course = courses.find((course) => course.id === selectedCourse)?.name || "";
            if (!course) {
                setError("Invalid course");
                return;
            }

            const pdfData = await fileToBase64(file);
            const wordCount = await countPdfWords(pdfData);
            const criteriaA = Math.floor(Math.random() * 4) + 7;
            const criteriaB = Math.floor(Math.random() * 2) + 5;
            const criteriaC = Math.floor(Math.random() * 2) + 1;
            const marks = Math.floor(Math.random() * 15) + 5;
            const readMins = Math.floor(Math.random() * 12) + 18;
            const star = Math.floor(Math.random() * 7) + 1;
            const category = Object.values(TabTypeValues)[Math.floor(Math.random() * 4)] as TabType;
            const description = Array.from(
                { length: Math.floor(Math.random() * 40) + 10 },
                () => "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            );

            const payload: Coursework = {
                id: Math.random().toString(36).substr(2, 9),
                title: essayTitle,
                description: description.join(" "),
                file: pdfData,
                fileName: file.name,
                marks,
                evaluatedDate: moment().unix(),
                criteriaA,
                criteriaB,
                criteriaC,
                tags: {
                    wordCount,
                    readMins,
                    star,
                    language: "English",
                    subject: subjects.find((subject) => subject.id === selectedSubject)?.name || "",
                    course: courses.find((course) => course.id === selectedCourse)?.name || "",
                },
                category,
            };

            saveCoursework(payload);
            fetchCourseworks();

            // Reset the form
            setFile(null);
            setEssayTitle("");
            setSelectedCourse("");
            setSelectedSubject("");

            toast("Coursework saved!", { type: "success" });
        } catch (err: unknown) {
            if ((err as Error).message.includes("coursework_zuai")) {
                toast("Looks like local storage is full. Please clear some courseworks to save new ones.", {
                    type: "error",
                });
                return;
            }
            toast((err as Error).message, { type: "error" });
        } finally {
            setError("");
        }
    };

    useEffect(() => {
        fetchCourseworks();
    }, []);

    return (
        <main className="flex flex-col gap-8 row-start-2 items-center">
            <div className="xl:max-w-[1099px] lg:max-w-[900px] w-full lg:px-[32px] p-[12px] xl:mt-[180px] lg:mt-[120px] mt-[40px] mb-[40px] flex flex-col gap-[40px]">
                <div className="flex gap-[16px] items-stretch">
                    <div className="md:max-w-[500px] w-full m-auto">
                        <Header />
                        <Card className="bg-[#FCFBFDB8] p-[20px] mt-[24px] rounded-[24px]">
                            <FileUpload file={file} handleFileUpload={handleFileUpload} reset={() => setFile(null)} />
                            <CourseAndSubjectSelection
                                courses={courses}
                                subjects={subjects}
                                selectedCourse={selectedCourse}
                                setSelectedCourse={setSelectedCourse}
                                selectedSubject={selectedSubject}
                                setSelectedSubject={setSelectedSubject}
                            />
                            <EssayTitleInput
                                value={essayTitle}
                                onChange={(e) => setEssayTitle(e.target.value)}
                                error={error}
                                setError={() => setError("")}
                            />
                            <EvaluateScoreButton handleSubmit={saveMetadata} disabled={disabled} />
                        </Card>
                    </div>
                    <RightCard />
                </div>

                <CourseworkSection
                    courseworks={courseworks.slice(0, 2)}
                    handleViewAll={() => setSelectedTab("all")}
                    handleDeleteCoursework={handleDeleteCoursework}
                />
                <ExploreCourseworkSection
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    courseworks={courseworks}
                    handleDeleteCoursework={handleDeleteCoursework}
                />

                <ClearLocalstorageDialog handleClearAllCourseworks={handleClearAllCourseworks} />
            </div>
        </main>
    );
};

export default Home;
