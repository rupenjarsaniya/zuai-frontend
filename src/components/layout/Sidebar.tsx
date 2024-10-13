import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import LogoSvg from "@/assets/images/logo.svg";
import ProfilePng from "@/assets/images/profile.png";
import { navItems } from "@/data";
import Link from "next/link";

const ICON_SIZE = 36;

export const Sidebar: FC = () => {
    return (
        <aside className="hidden sm:flex flex-col items-center h-[calc(100vh-16px)] w-[52px] bg-[#F8FAFC] rounded-[16px] m-[8px] p-[8px]">
            {/* Logo */}
            <div className="flex items-center justify-center w-[36px] h-[36px]">
                <Image src={LogoSvg} alt="Zuai Logo" width={200} height={200} className="object-fill" />
            </div>

            {/* Navigation Icons */}
            <nav className="flex flex-col gap-[8px] items-center flex-1">
                {navItems.map((item) => (
                    <IconButton key={item.alt} src={item.src} alt={item.alt} isActive={item.isActive} link={item.link} />
                ))}
            </nav>

            {/* Profile Icon */}
            <div className="flex items-center justify-center w-[36px] h-[36px]">
                <Image src={ProfilePng} alt="Profile" width={200} height={200} className="object-fill" />
            </div>
        </aside>
    );
};

interface IconButtonProps {
    src: StaticImageData;
    alt: string;
    isActive?: boolean;
    link?: string;
}

const IconButton: FC<IconButtonProps> = ({ src, alt, isActive, link }) => (
    <Link
        className={`rounded-full p-[9px] transition-all ${isActive ? "bg-[#6947BF]" : ""}`}
        style={{ width: ICON_SIZE, height: ICON_SIZE }}
        href={link || "/"}
    >
        <Image src={src} alt={alt} width={200} height={200} className="object-fill" />
    </Link>
);
