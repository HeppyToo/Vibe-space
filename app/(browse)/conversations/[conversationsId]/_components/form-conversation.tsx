"use client";

import * as z from "zod";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import useConversation from "@/hooks/use-conversation";
import { ConversationSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiLocationOn } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import {BsEmojiAngry, BsEmojiSmile} from "react-icons/bs";

export const FormConversation = () => {
  const { conversationId } = useConversation();

  const form = useForm<z.infer<typeof ConversationSchema>>({
    resolver: zodResolver(ConversationSchema),
    defaultValues: {
      message: "",
    },
  });

  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //     setValue('message', '', { shouldValidate: true });
  //     axios.post('/api/messages', {
  //         ...data,
  //         conversationId: conversationId
  //     })
  // }

  // const handleUpload = (result: any) => {
  //     axios.post('/api/messages', {
  //         image: result.info.secure_url,
  //         conversationId: conversationId
  //     })
  // }

  return (
    <Form {...form}>
      <form className="p-5">
        <div>
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
                        placeholder="Massagess..."
                        className="pl-11 py-5 my-5s"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
    //   <div
    //       className="
    //   py-4
    //   px-4
    //   bg-white
    //   border-t
    //   flex
    //   items-center
    //   gap-2
    //   lg:gap-4
    //   w-full
    // "
    //   >
    //       <CldUploadButton
    //           options={{ maxFiles: 1 }}
    //           onUpload={handleUpload}
    //           uploadPreset="zbhgu6ih"
    //       >
    //           <HiPhoto size={30} className="text-sky-500" />
    //       </CldUploadButton>
    //       <form
    //           onSubmit={handleSubmit(onSubmit)}
    //           className="flex items-center gap-2 lg:gap-4 w-full"
    //       >
    //           <MessageInput
    //               id="message"
    //               register={register}
    //               errors={errors}
    //               required
    //               placeholder="Write a message"
    //           />
    //           <button
    //               type="submit"
    //               className="
    //       rounded-full
    //       p-2
    //       bg-sky-500
    //       cursor-pointer
    //       hover:bg-sky-600
    //       transition
    //     "
    //           >
    //               <HiPaperAirplane
    //                   size={18}
    //                   className="text-white"
    //               />
    //           </button>
    //       </form>
    //   </div>
  );
};
