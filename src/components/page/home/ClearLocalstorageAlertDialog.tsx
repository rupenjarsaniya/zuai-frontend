import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FC } from "react";

interface ClearLocalstorageAlertDialogProps {
    handleClearAllCourseworks: () => void;
}

export const ClearLocalstorageAlertDialog: FC<ClearLocalstorageAlertDialogProps> = ({ handleClearAllCourseworks }) => (
    <AlertDialog>
        <AlertDialogTrigger>
            <div className="w-fit border rounded-[24px] bg-[#6947BF] text-white py-[8px] px-[16px] hover:bg-[#6947BF] hover:text-white text-sm font-bold">
                Clear Storage
            </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px]">
            <AlertDialogHeader>
                <AlertDialogTitle>Clear Local Storage</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to clear all the couseworks stored in the local storage? This action cannot be
                    undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearAllCourseworks}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);
