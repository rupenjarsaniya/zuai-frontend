import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";
import { CircularProgress } from "./CircularProgress";

interface ScoreCardProps {
    title: string;
    scoreText: string;
    scoreTextColor: string;
    date: string;
    progress: number;
    scoreOutOf: string;
}

export const ScoreCard: FC<ScoreCardProps> = ({ title, scoreText, scoreTextColor, date, progress, scoreOutOf }) => (
    <>
        <Card className="bg-[#FFFFFF] rounded-[24px] py-[18px] px-[24px]">
            <CardContent className="flex items-center gap-[20px] p-0">
                <div className="flex-1 flex flex-col">
                    <p className="font-semibold text-sm text-[#3D404B]">{title}</p>
                    <h1 className="text-2xl font-extrabold text-[#3D404B]">
                        Remark : <span className={`${scoreTextColor}`}>{scoreText}</span>
                    </h1>
                    <p className="text-xs font-semibold text-[#98A1BB]">Evaluated on {date}</p>
                </div>
                <CircularProgress progress={progress} text={scoreOutOf} size={80} color={scoreTextColor} />
            </CardContent>
        </Card>
        {scoreText === "Good" && (
            <Card className="bg-[#3cc28a50] rounded-[24px] py-[18px] px-[24px] border border-[#3CC28A]">
                <CardContent className="flex items-center gap-[20px] p-0">
                    <div className="flex-1 flex flex-col">
                        <p className="font-semibold text-sm text-[#3D404B]">Feedback</p>
                        <h1 className="text-2xl font-extrabold text-[#3D404B]">You have done a great job. Keep it up!</h1>
                    </div>
                </CardContent>
            </Card>
        )}
    </>
);
