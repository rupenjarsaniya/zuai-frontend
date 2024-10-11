import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";
import { CircularProgress } from "./CircularProgress";

interface ScoreCardProps {
    title: string;
    scoreText: string;
    date: string;
    progress: number;
    scoreOutOf: string;
}

export const ScoreCard: FC<ScoreCardProps> = ({ title, scoreText, date, progress, scoreOutOf }) => (
    <Card className="bg-[#FFFFFF] rounded-[24px] py-[18px] px-[24px]">
        <CardContent className="flex items-center gap-[20px] p-0">
            <div className="flex-1 flex flex-col">
                <p className="font-semibold text-sm text-[#3D404B]">{title}</p>
                <h1 className="text-2xl font-extrabold text-[#3D404B]">
                    Remark : <span className="text-[#3CC28A]">{scoreText}</span>
                </h1>
                <p className="text-xs font-semibold text-[#98A1BB]">Evaluated on {date}</p>
            </div>
            <CircularProgress progress={progress} text={scoreOutOf} size={80} />
        </CardContent>
    </Card>
);
