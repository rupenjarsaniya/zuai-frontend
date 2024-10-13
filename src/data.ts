import { TabType } from "./lib/types";
import DashboardSvg from "@/assets/images/dashboard.svg";
import BookSvg from "@/assets/images/book.svg";
import FileCopySvg from "@/assets/images/file_copy.svg";
import QuizSvg from "@/assets/images/quiz.svg";

export const ListOfTabs: { id: TabType; name: string }[] = [
    { id: "all", name: "All" },
    { id: "ia_example", name: "IA Example" },
    { id: "ee_example", name: "EE Example" },
    { id: "io_example", name: "IO Example" },
    { id: "tok_example", name: "Tok Example" },
];

export const navItems = [
    { src: DashboardSvg, alt: "Dashboard", isActive: true, link: "/" },
    { src: BookSvg, alt: "Book" },
    { src: FileCopySvg, alt: "File Copy" },
    { src: QuizSvg, alt: "Quiz" },
];
