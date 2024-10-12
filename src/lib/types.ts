export type Tags = {
    image: string;
    title: string;
};

export interface Coursework {
    id: string;
    title: string;
    description: string;
    tags: {
        wordCount: number;
        readMins: number;
        star: number;
        language: string;
        subject: string;
        course: string;
    };
    file: string;
    fileName: string;
    marks: number;
    evaluatedDate: number;
    criteriaA: number;
    criteriaB: number;
    criteriaC: number;
}

export type Course = { id: string; name: string };

export type Subject = { id: string; name: string };

export type TabTypes = "all" | "ia_example" | "ee_example" | "io_example" | "tok_example";
