import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MdOutlineReportProblem } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";

export function ReportProblem() {
  const [message, setMessage] = useState("");
  const { collapsed } = useSidebar((state) => state);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(message);
    setMessage("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="bg-black">
        <Button
          variant="default"
          className="pl-2 bg-black border-0 w-full h-12 hover:bg-[#333333]"
        >
          <div className="w-full pl-2 flex gap-x-2 items-center">
            <MdOutlineReportProblem className="w-6 h-6" />
            {!collapsed && <p className="pl-3 text-md">Report a problem</p>}
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-white bg-black border-slate-800/40">
        <DialogHeader>
          <DialogTitle className="flex w-full justify-center items-center pb-4 border-b border-b-slate-800">
            Report a problem
          </DialogTitle>
        </DialogHeader>
        <div className="pt-4">
          <Textarea
            placeholder="Type your message here."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full pl-2 pt-1 bg-[#1f1f1f] border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
          />
          <p className="pt-4 text-sm text-muted-foreground">
            Your Instagram username and browser information will be
            automatically included in your report.
          </p>
        </div>
        <DialogFooter className="flex flex-row justify-center">
          <Button type="submit" onClick={handleSubmit} className="w-full">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
