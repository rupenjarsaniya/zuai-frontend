"use client";

import { ChangeEvent, FC, useMemo, useState } from "react";
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
import { Course, Coursework, Subject, TabTypes } from "@/lib/types";
import moment from "moment";
import { generateMetadataForPdf } from "@/lib/pdf";

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
    const [selectedTab, setSelectedTab] = useState<TabTypes>("all");

    const disabled = useMemo(
        () => !selectedCourse || !selectedSubject || !essayTitle || !file,
        [selectedCourse, selectedSubject, essayTitle, file],
    );

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

            const fileMetadata = await generateMetadataForPdf(file);

            const criteriaA = Math.floor(Math.random() * 4) + 7;
            const criteriaB = Math.floor(Math.random() * 2) + 5;
            const criteriaC = Math.floor(Math.random() * 2) + 1;
            const marks = Math.floor(Math.random() * 15) + 5;

            const readMins = Math.floor(Math.random() * 12) + 18;
            const star = Math.floor(Math.random() * 7) + 1;

            const payload: Coursework = {
                id: Math.random().toString(36).substr(2, 9),
                title: essayTitle,
                description: "",
                file: fileMetadata,
                fileName: file.name,
                marks,
                evaluatedDate: moment().unix(),
                criteriaA,
                criteriaB,
                criteriaC,
                tags: {
                    wordCount: 0,
                    readMins,
                    star,
                    language: "English",
                    subject: subjects.find((subject) => subject.id === selectedSubject)?.name || "",
                    course: courses.find((course) => course.id === selectedCourse)?.name || "",
                },
            };

            // Save metadata to array of metadata in local storage
            const metadata = localStorage.getItem("coursework_zuai") || "[]";
            const metadataArray = JSON.parse(metadata) as Coursework[];
            metadataArray.push(payload);
            localStorage.setItem("coursework_zuai", JSON.stringify(metadataArray));

            // Reset the form
            setFile(null);
            setEssayTitle("");
            setSelectedCourse("");
            setSelectedSubject("");

            toast("Coursework saved!", { type: "success" });
        } catch (err) {
            console.log(err);
        } finally {
            setError("");
        }
    };

    return (
        <main className="flex flex-col gap-8 row-start-2 items-center">
            <div className="max-w-[1099px] mt-[180px] mb-[180px] flex flex-col gap-[40px]">
                <div className="flex gap-[16px] items-stretch">
                    <div>
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

                <CourseworkSection />
                <ExploreCourseworkSection selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            </div>
        </main>
    );
};

export default Home;
