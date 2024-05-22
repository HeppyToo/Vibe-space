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
import { CiHashtag, CiLocationOn } from "react-icons/ci";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

interface PostFormProps {
  action: string;
}

export const PostForm = ({ action }: PostFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<File[]>([]);
  const user = useCurrentUser();
  const { push } = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

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

    let uploadedImageUrl = value.imageUrl;

    if (!user || !user.email) {
      setError("User or user email is not defined");
      return;
    }

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      console.log("uploadedImages", uploadedImages);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    const userEmail: string = user.email;

    startTransition(async () => {
      createPost(value, userEmail, uploadedImageUrl)
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
        className="flex flex-col gap-9 w-full"
      >
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-1/2 h-full">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
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
          </div>

          <div className="flex flex-col w-1/2">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-white text-md">Caption</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center justify-center">
                      <Textarea
                        className="h-72 bg-[#1f1f1f] pl-4 pt-2 border-none focus:ring-1 focus:ring-offset-1 ring-offset-light-3"
                        placeholder={`What's on your mind, ${user?.name}?`}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-white">Location</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center justify-center w-full ">
                      <CiLocationOn className="absolute left-2 w-6 h-6" />
                      <Input
                        type="text"
                        placeholder="Berlin"
                        className="pl-9"
                        {...field}
                      />
                    </div>
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
                    <div className="relative flex items-center justify-center w-full ">
                      <CiHashtag className="absolute  left-2 w-6 h-6" />
                      <Input
                        placeholder="Art, Expression, Learn"
                        type="text"
                        className="pl-9"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormError massage={error} />
            <FormSuccess massage={success} />
            <div className="flex flex-col pt-4 gap-4 items-center justify-end">
              <Button
                type="submit"
                className="lg:w-full whitespace-nowrap"
                disabled={isPending}
              >
                {!isPending ? "Post" : "Posting..."}
              </Button>
                <Button type="button" className="lg:w-full whitespace-nowrap" disabled={isPending}>
                    Cancel
                </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
