import { FC } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectInputProps {
    placeholder: string;
    options: { id: string; name: string }[];
    value: string | undefined;
    onChange: (value: string) => void;
    width: string;
}

export const SelectInput: FC<SelectInputProps> = ({ placeholder, options, value, onChange, width }) => (
    <Select value={value}>
        <SelectTrigger
            className={`w-[${width}] border border-[#EAF0F2] rounded-[24px] bg-transparent text-[#5B6170] pt-[8px] pb-[8px] pl-[16px]`}
        >
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            {options.map((option) => (
                <SelectItem
                    key={option.id}
                    value={option.id}
                    className="text-[#5B6170] hover:bg-[#EAF0F2] cursor-pointer"
                    onClick={() => onChange(option.id)}
                >
                    {option.name}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);
