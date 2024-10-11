import { FC } from "react";
import { SelectInput } from "./SelectInput";

export type Course = { id: string; name: string };
export type Subject = { id: string; name: string };

interface CourseAndSubjectSelectionProps {
    courses: Course[];
    subjects: Subject[];
    selectedCourse: string | undefined;
    setSelectedCourse: (course: string | undefined) => void;
    selectedSubject: string | undefined;
    setSelectedSubject: (subject: string | undefined) => void;
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
        <div className="flex gap-[21px] justify-start">
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
