import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const randomNumber = () => {
    return Math.floor(Math.random() * 3) + 1;
};
