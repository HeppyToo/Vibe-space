'use client';

import { Dispatch, SetStateAction, useCallback } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import { CiImageOn } from "react-icons/ci";

import { useDropzone } from "@uploadthing/react/hooks";
import Image from "next/image";

type FileUploaderProps = {
    onFieldChange: (url: string) => void;
    imageUrl: string;
    setFiles: Dispatch<SetStateAction<File[]>>;
};

export function ImageUploaderMessage({
                                         imageUrl,
                                         onFieldChange,
                                         setFiles,
                                     }: FileUploaderProps) {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                setFiles(acceptedFiles);
                const fileUrl = convertFileToUrl(acceptedFiles[0]);
                onFieldChange(fileUrl);
            }
        },
        [onFieldChange, setFiles]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: generateClientDropzoneAccept(["image/*"]),
    });

    return (
        <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            {imageUrl ? (
                <div
                    className="flex h-full w-full justify-center"
                    style={{ width: "30px", height: "30px" }}
                >
                    <div className="overflow-hidden" style={{ width: "30px", height: "30px" }}>
                        <Image
                            src={imageUrl}
                            alt="Uploaded image"
                            width={30}
                            height={30}
                            className="w-full object-cover object-center"
                        />
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-full flex-col">
                    <CiImageOn className="w-6 h-6" />
                </div>
            )}
        </div>
    );
}
