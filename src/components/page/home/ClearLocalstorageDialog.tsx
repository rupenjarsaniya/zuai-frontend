import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";

interface ClearLocalstorageDialogProps {
    handleClearAllCourseworks: () => void;
}

export const ClearLocalstorageDialog: FC<ClearLocalstorageDialogProps> = ({ handleClearAllCourseworks }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button
                variant="outline"
                className="w-fit border rounded-[24px] bg-[#6947BF] text-white p-[8px] hover:bg-[#6947BF] hover:text-white text-sm font-medium"
            >
                Clear Storage
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Clear Local Storage</DialogTitle>
                <DialogDescription>
                    Are you sure you want to clear all the couseworks stored in the local storage? This action cannot be
                    undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="destructive" type="submit" onClick={handleClearAllCourseworks}>
                        Clear
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);
