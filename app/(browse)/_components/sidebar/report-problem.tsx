import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { MdOutlineReportProblem } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ReportSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { createProblemReport } from "@/action/report-problem";

export function ReportProblem() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { collapsed } = useSidebar((state) => state);

  const form = useForm<z.infer<typeof ReportSchema>>({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ReportSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createProblemReport(values)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccess(data.success);
            }
          })
          .catch(() => setError("Something went wrong!"));
    });
  };

  return (
      <Dialog>
        <DialogTrigger asChild>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="pt-4">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                                {...field}
                                placeholder="Type your message here."
                                className="w-full pl-2 pt-1 bg-[#1f1f1f] border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )}
                />
                <p className="pt-4 pb-4 text-sm text-muted-foreground">
                  Your Instagram username and browser information will be
                  automatically included in your report.
                </p>
                <DialogFooter className="flex flex-row justify-center">
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Sending..." : "Send"}
                  </Button>
                </DialogFooter>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  );
}
