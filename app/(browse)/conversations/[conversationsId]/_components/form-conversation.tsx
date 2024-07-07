'use client';

import React, { useState, useCallback } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import useConversation from "@/hooks/use-conversation";
import { ConversationSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { CiHeart } from "react-icons/ci";
import { BsEmojiSmile } from "react-icons/bs";
import { ImageUploaderMessage } from "@/app/(browse)/conversations/[conversationsId]/_components/image-uploader-message";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { GoPaperAirplane } from "react-icons/go";

export const FormConversation: React.FC = () => {
  const { conversationId } = useConversation();
  const { startUpload } = useUploadThing("imageUploader");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");

  const form = useForm<z.infer<typeof ConversationSchema>>({
    resolver: zodResolver(ConversationSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = useCallback(async (value: z.infer<typeof ConversationSchema>) => {
    setIsSubmitting(true);
    let uploadedImageUrl = imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (uploadedImages) {
        uploadedImageUrl = uploadedImages[0].url;
      }
    }

    const submissionData = {
      ...value,
      conversationId,
      image: uploadedImageUrl,
    };

    try {
      await axios.post("/api/messages", submissionData);
      form.reset();
      setFiles([]);
      setImageUrl("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [conversationId, form, files, imageUrl, startUpload]);

  const sendHeartMessage = useCallback(async () => {
    setIsSubmitting(true);

    const submissionData = {
      message: "❤️",
      conversationId,
      image: "",
    };

    try {
      await axios.post("/api/messages", submissionData);
      form.reset();
    } catch (error) {
      console.error("Error sending heart message:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [conversationId, form]);

  const handleImageUpload = useCallback((url: string) => {
    setImageUrl(url);
  }, []);

  return (
      <Form {...form}>
        <form className="px-6 pb-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative flex items-center justify-center w-full">
                          <BsEmojiSmile className="absolute left-2 w-6 h-6" />
                          <Input
                              type="text"
                              placeholder="Messages..."
                              className="pl-11 pr-10 py-5 w-full"
                              autoComplete="off"
                              {...field}
                              disabled={isSubmitting}
                          />
                          <div className="absolute right-2 flex items-center space-x-2 pr-2">
                            <CiHeart className="w-6 h-6 cursor-pointer" onClick={sendHeartMessage} />
                            <ImageUploaderMessage
                                onFieldChange={handleImageUpload}
                                imageUrl={imageUrl}
                                setFiles={setFiles}
                            />
                            <Button
                                variant="outline"
                                type="submit"
                                className="text-white px-4 py-2 rounded-md border-0"
                                disabled={isSubmitting}
                            >
                              <GoPaperAirplane className="h-5 w-6" />
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                )}
            />
          </div>
        </form>
      </Form>
  );
};
