"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoSvg from "@/assets/images/logo.svg";
import MenuSvg from "@/assets/images/menu.svg";

export const Navbar: FC = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleNavigation = (path: string) => {
        router.push(path);
        setIsOpen(false);
    };

    return (
        <nav className="relative flex items-center justify-between h-[60px] w-full bg-white px-3 sm:hidden">
            {/* Logo */}
            <div className="flex items-center justify-center w-[60px] h-[30px]">
                <Image src={LogoSvg} alt="Zuai Logo" className="object-fill" />
            </div>

            {/* Menu Button */}
            <button
                className="flex items-center justify-center w-[36px] h-[36px] p-1"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Toggle Menu"
            >
                <Image src={MenuSvg} alt="Menu Icon" className="object-fill" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <ul className="absolute top-full left-0 right-0 bg-white shadow-lg">
                    <li
                        className="p-3 border-t border-gray-100 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleNavigation("/")}
                    >
                        Dashboard
                    </li>
                </ul>
            )}
        </nav>
    );
};
