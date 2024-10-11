"use client";

import { FC, useEffect, useState } from "react";

interface CircularProgressProps {
    size?: number;
    progress?: number;
    text?: string;
    textSize?: string;
    color?: string;
}

export const CircularProgress: FC<CircularProgressProps> = ({
    size = 100,
    progress = 0,
    text = progress,
    textSize = "text-base",
    color = "text-[#3CC28A]",
}) => {
    const [offset, setOffset] = useState(0);

    const center = size / 2;
    const radius = center - 5; // To add some padding
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const progressOffset = ((100 - progress) / 100) * circumference;
        setOffset(progressOffset);
    }, [progress, circumference]);

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
                className="text-[#EAF0F2]"
                strokeWidth={size / 10}
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx={center}
                cy={center}
            />
            <circle
                className={`${color} transition-all duration-300 ease-in-out`}
                strokeWidth={size / 10}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx={center}
                cy={center}
                transform={`rotate(-90 ${center} ${center})`}
            />
            <text
                className={`${textSize} font-bold fill-current text-[#1E2026]`}
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
            >
                {text}
            </text>
        </svg>
    );
};
