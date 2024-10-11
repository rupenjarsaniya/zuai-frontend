"use client";

import { ChangeEvent, FC, useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "react-toastify";
import {
    EssayTitleInput,
    RightCard,
    CourseAndSubjectSelection,
    Course,
    Subject,
    Header,
    FileUpload,
    EvaluateScoreButton,
    CourseworkSection,
    TabTypes,
    ExploreCourseworkSection,
} from "@/components/page/home";

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
    const [selectedCourse, setSelectedCourse] = useState<string | undefined>(undefined);
    const [selectedSubject, setSelectedSubject] = useState<string | undefined>(undefined);
    const [essayTitle, setEssayTitle] = useState("");
    const [error, setError] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [selectedTab, setSelectedTab] = useState<TabTypes>("all");

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
                            <EvaluateScoreButton />
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
