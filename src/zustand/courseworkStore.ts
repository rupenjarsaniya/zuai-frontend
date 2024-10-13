import { Coursework } from "@/lib/types";
import { create } from "zustand";

interface CourseworkStore {
    courseworks: Coursework[];
    addCoursework: (item: Coursework) => void;
    deleteCoursework: (id: string) => void;
    clearCourseworks: () => void;
    getCourseworkById: (id: string) => Coursework | undefined;
}

export const useCourseworkStore = create<CourseworkStore>((set) => ({
    courseworks:
        typeof window !== "undefined" ? (JSON.parse(localStorage.getItem("coursework_zuai") || "[]") as Coursework[]) : [],

    addCoursework: (item: Coursework) => {
        set((state) => {
            const newItems = [...state.courseworks, item];
            localStorage.setItem("coursework_zuai", JSON.stringify(newItems));
            return { courseworks: newItems };
        });
    },

    deleteCoursework: (id: string) => {
        set((state) => {
            const newItems = state.courseworks.filter((item) => item.id !== id);
            localStorage.setItem("coursework_zuai", JSON.stringify(newItems));
            return { courseworks: newItems };
        });
    },

    clearCourseworks: () => {
        localStorage.removeItem("coursework_zuai");
        set({ courseworks: [] });
    },

    getCourseworkById: (id: string) => {
        const items = JSON.parse(localStorage.getItem("coursework_zuai") || "[]") as Coursework[];
        return items.find((item) => item.id === id);
    },
}));
