import { FC } from "react";
import { SelectInput } from "./SelectInput";
import { Course, Subject } from "@/lib/types";

interface CourseAndSubjectSelectionProps {
    courses: Course[];
    subjects: Subject[];
    selectedCourse: string;
    setSelectedCourse: (course: string) => void;
    selectedSubject: string;
    setSelectedSubject: (subject: string) => void;
}

export const CourseAndSubjectSelection: FC<CourseAndSubjectSelectionProps> = ({
    courses,
    subjects,
    selectedCourse,
    setSelectedCourse,
    selectedSubject,
    setSelectedSubject,
}) => (
    <div className="mt-[24px] flex flex-col gap-[6px]">
        <p className="text-[#7A8196] font-semibold text-base">Select your course & subjects*</p>
        <div className="flex sm:flex-row flex-col sm:gap-[21px] gap-[4px] justify-start sm:items-center items-start">
            <SelectInput
                placeholder="Coursework Type"
                options={courses}
                value={selectedCourse}
                onChange={setSelectedCourse}
                width="187px"
            />
            <SelectInput
                placeholder="Subject"
                options={subjects}
                value={selectedSubject}
                onChange={setSelectedSubject}
                width="115px"
            />
        </div>
    </div>
);
