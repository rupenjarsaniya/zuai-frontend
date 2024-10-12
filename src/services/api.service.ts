import { Coursework } from "@/lib/types";

export const saveCoursework = (payload: Coursework) => {
    const metadata = localStorage.getItem("coursework_zuai") || "[]";
    const metadataArray = JSON.parse(metadata) as Coursework[];
    metadataArray.push(payload);
    localStorage.setItem("coursework_zuai", JSON.stringify(metadataArray));
};

export const getCourseworks = () => {
    const metadata = localStorage.getItem("coursework_zuai") || "[]";
    return JSON.parse(metadata) as Coursework[];
};

export const getCourseworkById = (id: string) => {
    const metadata = localStorage.getItem("coursework_zuai") || "[]";
    const metadataArray = JSON.parse(metadata) as Coursework[];
    return metadataArray.find((coursework) => coursework.id === id) || null;
};

export const removeCoursework = (id: string) => {
    const metadata = localStorage.getItem("coursework_zuai") || "[]";
    const metadataArray = JSON.parse(metadata) as Coursework[];
    const updatedMetadata = metadataArray.filter((coursework) => coursework.id !== id);
    localStorage.setItem("coursework_zuai", JSON.stringify(updatedMetadata));
};

export const clearAllCourseworks = () => {
    localStorage.removeItem("coursework_zuai");
};
