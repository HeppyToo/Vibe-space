import React from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MdOutlineReportProblem } from "react-icons/md";
import {Button} from "@/components/ui/button";

export function ReportProblem() {

    const handleClick = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
    }

    return (
        <Dialog>
            <DialogTrigger asChild className="bg-black">
                <Button variant="default" onClick={handleClick} className="pl-2 bg-black border-0 w-full h-12 hover:bg-[#333333]">
                    <div className="w-full pl-2 flex gap-x-2 items-center">
                        <MdOutlineReportProblem className="w-6 h-6"/>
                        <p className="pl-3 text-md">
                            Report a problem
                        </p>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] text-white bg-[#1f1f1f] border-slate-800/40">
                <DialogHeader>
                    <DialogTitle>Report a problem</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
