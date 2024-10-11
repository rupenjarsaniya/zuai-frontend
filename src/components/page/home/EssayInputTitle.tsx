import { Input } from "@/components/ui/input";
import { ChangeEventHandler, FC, FocusEventHandler } from "react";

interface InputProps {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    error: string;
    setError?: FocusEventHandler<HTMLInputElement>;
}

export const EssayTitleInput: FC<InputProps> = ({ value, onChange, error, setError }) => (
    <div className="mt-[16px] flex flex-col gap-[6px]">
        <p className="text-[#7A8196] font-semibold text-base">Enter your essay title*(Required)</p>
        <Input
            type="text"
            placeholder="how nation works..."
            value={value}
            onChange={onChange}
            className={`sm:w-[330px] w-full border rounded-[24px] bg-transparent text-[#5B6170] pt-[8px] pb-[8px] pl-[16px] ${
                error ? "border-[#FF4800]" : "border-[#EAF0F2]"
            }`}
            onFocus={setError}
        />
    </div>
);
