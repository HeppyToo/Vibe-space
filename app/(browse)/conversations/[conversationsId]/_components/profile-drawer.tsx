"use client";

import { useMemo, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import { Conversation, User } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useOtherUser from "@/hooks/use-other-user";
import { multiFormatDateString } from "@/lib/utils";
import useActiveList from "@/hooks/use-active-list";
import UserAvatar from "@/components/user-avatar";
import AvatarGroup from "@/components/ui/avatar-group";
import ConfirmModal from "@/app/(browse)/conversations/[conversationsId]/_components/confirm-modal";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const otherUser = useOtherUser(data);

  const joinedDate = useMemo(() => {
    return multiFormatDateString(otherUser.createdAt.toString());
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [data, isActive]);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-[#1f1f1f] border-slate-600/40">
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col items-center">
                <div className="flex justify-between items-center w-full pb-3">
                  <div className="flex">
                    <div className="flex items-start justify-start mb-2">
                      {data.isGroup ? (
                        <AvatarGroup users={data.users} />
                      ) : (
                        <UserAvatar user={otherUser} />
                      )}
                    </div>
                    <div className="pl-2">
                      <div>{title}</div>
                      <div className="text-sm text-gray-500">{statusText}</div>
                    </div>
                  </div>
                  <div
                    onClick={() => setConfirmOpen(true)}
                    className="cursor-pointer hover:opacity-75 pr-4"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black">
                      <IoTrash size={20} color="white" />
                    </div>
                  </div>
                </div>
                <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                  <dl className="space-y-8 px-1 sm:space-y-6 sm:px-3">
                    {data.isGroup && (
                      <div className="">
                        <dt
                          className="
                            text-sm
                            font-medium
                            text-white
                            sm:w-40
                            sm:flex-shrink-0
                          "
                        >
                          Emails
                        </dt>
                        <dd
                          className="
                            mt-1 
                            text-sm 
                            sm:col-span-2
                            text-gray-500
                          "
                        >
                          {data.users.map((user) => user.email).join(", ")}
                        </dd>
                      </div>
                    )}
                    {!data.isGroup && (
                      <div>
                        <dt
                          className="
                            text-sm 
                            font-medium 
                            text-white
                            sm:w-40 
                            sm:flex-shrink-0
                          "
                        >
                          Email
                        </dt>
                        <dd
                          className="
                            mt-1 
                            text-sm 
                            text-gray-500
                            sm:col-span-2
                          "
                        >
                          {otherUser.email}
                        </dd>
                      </div>
                    )}
                    {!data.isGroup && (
                      <>
                        <hr />
                        <div>
                          <dt
                            className="
                              text-sm 
                              font-medium 
                              text-white
                              sm:w-40
                              sm:flex-shrink-0
                            "
                          >
                            Joined
                          </dt>
                          <dd
                            className="
                              mt-1 
                              text-sm 
                              text-gray-500
                              sm:col-span-2
                            "
                          >
                            <time dateTime={joinedDate}>{joinedDate}</time>
                          </dd>
                        </div>
                      </>
                    )}
                  </dl>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter  className="pl-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileDrawer;
