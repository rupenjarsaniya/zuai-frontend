import Image from "next/image";
import UserPng from "@/assets/images/user.png";
import GradeCardPng from "@/assets/images/gradecard.png";
import { FC } from "react";

export const RightCard: FC = () => (
    <div className="w-[50%] hidden lg:flex flex-col items-center">
        <Image src={UserPng} alt="user" />
        <div className="bg-[#FFFFFF] border border-[#D6DFE4] rounded-[24px] pt-[28px] pl-[28px] pr-[28px] relative h-full flex flex-col items-center justify-between overflow-hidden">
            <h1 className="text-[#6947BF] font-extrabold	text-[33px]">Evaluate your Coursework with a single click</h1>
            <Image src={GradeCardPng} alt="Grade Card" className="z-10" />
            <div className="border [border-image-source:linear-gradient(0deg,_#FFFFFF,_#FFFFFF),radial-gradient(74.37%_74.37%_at_49.93%_1.82%,_rgba(255,_72,_0,_0)_0%,_rgba(255,_72,_0,_0.1)_100%)] bg-[#F5EDE51A] w-[455px] h-[455px] rounded-full absolute bottom-0 -right-7" />
            <div className="bg-[#F5EDE521] w-[400px] h-[400px] rounded-full absolute -bottom-10  flex items-center justify-center">
                <div className="bg-[#F5EDE54A] w-[290px] h-[290px] rounded-full flex items-center justify-center">
                    <div className="bg-[#F5EDE5] w-[193px] h-[193px] rounded-full" />
                </div>
            </div>
        </div>
    </div>
);
