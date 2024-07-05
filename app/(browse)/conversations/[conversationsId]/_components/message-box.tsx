"use client";

import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/types";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaUser} from "react-icons/fa";
import {multiFormatDateString} from "@/lib/utils";
import ImageModal from "@/app/(browse)/conversations/[conversationsId]/_components/image-modal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3",
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Link href={`/profile/${data.sender.id}`}>
          <div className="flex items-center space-x-2">
            <Avatar className="w-10 h-10  ml-2">
              <AvatarImage
                  src={data.sender.image || ""}
                  alt="User"
                  className="outline-0"
              />
              <AvatarFallback className="bg-black outline-0">
                <FaUser className="text-white" />
              </AvatarFallback>
            </Avatar>
            <div className="pl-2">
              <p className="font-bold text-md">{data.sender.name}</p>
              <p className="text-gray-500 text-sm">{data.sender.username}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {multiFormatDateString(data.createdAt)}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)}
              src={data.image}
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div
            className="
            text-xs 
            font-light 
            text-gray-500
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
