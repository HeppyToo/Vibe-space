"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PostSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUploader } from "@/components/browse/file-uploader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { createPost } from "@/action/post";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/use-carrent-user";

interface PostFormProps {
  action: string;
}

export const PostForm = ({ action }: PostFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<File[]>([]);

  const user = useCurrentUser();

  const initialValues = {
    content: "",
    file: [],
    location: "",
    tags: "",
  };

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (value: z.infer<typeof PostSchema>) => {
    setError("");
    setSuccess("");

    if (!user || !user.email) {
      setError("User or user email is not defined");
      return;
    }

    // Introduce a new variable that is definitely a string
    const userEmail: string = user.email;

    startTransition(async () => {
      createPost(value, userEmail)
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white text-md">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="h-36 bg-[#1f1f1f] rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex justify-between space-x-4 w-full">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white">Location</FormLabel>
                <FormControl>
                  <Input type="text" className="" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white">
                  Add Tags (separated by comma " , ")
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Art, Expression, Learn"
                    type="text"
                    className=""
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <FormError massage={error} />
        <FormSuccess massage={success} />
        <div className="flex gap-4 items-center justify-end lg:justify-between">
          <Button
            type="submit"
            className="lg:w-full whitespace-nowrap"
            disabled={isPending}
          >
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};
