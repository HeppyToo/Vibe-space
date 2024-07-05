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
import { createPost, updatePost } from "@/action/post";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { CiHashtag, CiLocationOn } from "react-icons/ci";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-carrent-user";
import { Post } from "@prisma/client";

interface PostFormProps {
  action: string;
  post?: Post;
}

export const PostForm = ({ action, post }: PostFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useCurrentUser();
  const { push } = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  const initialValues = {
    content: post?.content || "",
    file: [],
    location: post?.location || "",
    tags: Array.isArray(post?.tags) ? post?.tags.join(", ") : post?.tags || "",
  };

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (value: z.infer<typeof PostSchema>) => {
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    let uploadedImageUrl = value.imageUrl;

    if (uploadedImageUrl === undefined) {
      uploadedImageUrl = "";
    }

    if (!user || !user.email) {
      setError("User or user email is not defined");
      setIsSubmitting(false);
      return;
    }

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        setError("Image upload failed");
        setIsSubmitting(false);
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }

    const userEmail: string = user.email;

    if (action === "Create") {
      startTransition(async () => {
        createPost(value, userEmail, uploadedImageUrl)
          .then((data) => {
            form.reset();
            setIsSubmitting(false);
            if (data?.error) {
              setError(data.error);
            }

            if (data?.success) {
              setSuccess(data.success);
              push("/");
            }
          })
          .catch(() => {
            setError("Something went wrong!");
            setIsSubmitting(false);
          });
      });
    }

    if (action === "Update" && post?.id) {
      startTransition(async () => {
        updatePost(Number(post.id), value, uploadedImageUrl)
          .then((data) => {
            form.reset();
            setIsSubmitting(false);
            if (data?.error) {
              setError(data.error);
            }

            if (data?.success) {
              setSuccess(data.success);
              push("/");
            }
          })
          .catch(() => {
            setError("Something went wrong!");
            setIsSubmitting(false);
          });
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full pb-5 lg:pb-0 max-w-5xl"
      >
        <div className="flex flex-col justify-center items-center md:flex-row gap-4">
          <div className="flex flex-col w-full md:w-1/2 h-full">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-white">Add Photos</FormLabel>
                  <FormControl>
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value || post?.imageUrl || ""}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col w-full md:w-1/2">
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
                      <CiHashtag className="absolute left-2 w-6 h-6" />
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
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="flex flex-col pt-4 gap-4 items-center justify-end">
              <Button
                type="submit"
                className="w-full whitespace-nowrap"
                disabled={isSubmitting || isPending}
              >
                {isSubmitting
                  ? "Submitting..."
                  : isPending
                  ? "Loading..."
                  : action}
              </Button>
              <Button
                type="button"
                className="w-full whitespace-nowrap"
                disabled={isSubmitting || isPending}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
