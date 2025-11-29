"use client";

import { useState } from "react";
import { Attachment, Attachments } from "../attachments/Attachments";
import Image from "next/image";
import { MessageInput } from "../common/MessageInput";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

export function CommentModalInput() {
  const t = useTranslations("comments.CommentModalInput");

  let [files, setFiles] = useState<FileList | null>(null);

  return (
    <div className="flex w-full flex-col gap-3 rounded-lg">
      {files && (
        <Attachments className="max-md:px-3 max-md:pt-3">
          {Array.from(files).map((file, index) => (
            <Attachment key={index}>
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                className="object-cover"
              />
            </Attachment>
          ))}
        </Attachments>
      )}

      <MessageInput
        inputClassName={twMerge(
          "max-md:bg-white dark:max-md:bg-gray-800 max-md:outline-hidden max-md:rounded-none",
          files && "border-t-1 border-gray-300 dark:border-gray-600",
        )}
        placeholder={t("placeholder")}
        onFilesSelect={(files) => setFiles(files)}
      />
    </div>
  );
}
