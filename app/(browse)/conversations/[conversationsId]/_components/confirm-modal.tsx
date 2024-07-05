'use client';

import React, { useCallback, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {toast} from "sonner";
import useConversation from "@/hooks/use-conversation";

interface ConfirmModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
                                                       isOpen,
                                                       onClose
                                                   }) => {
    const router = useRouter();
    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(() => {
        setIsLoading(true);

        axios.delete(`/api/conversations/${conversationId}`)
            .then(() => {
                onClose();
                router.push('/conversations');
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false));
    }, [router, conversationId, onClose]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete conversation
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this conversation? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="sm:flex sm:items-start">
                    <div
                        className="
              mx-auto
              flex
              h-12
              w-12
              flex-shrink-0
              items-center
              justify-center
              rounded-full
              bg-red-100
              sm:mx-0
              sm:h-10
              sm:w-10
            "
                    >
                        <FiAlertTriangle
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                        />
                    </div>
                    <div
                        className="
              mt-3
              text-center
              sm:ml-4
              sm:mt-0
              sm:text-left
            "
                    >
                        <p className="text-sm text-gray-500">
                            Are you sure you want to delete this conversation? This action cannot be undone.
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        disabled={isLoading}
                        variant="destructive"
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                    <Button
                        disabled={isLoading}
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmModal;
