"use client";

import Image from "next/image";
import { useState } from "react";
import { MessageInput } from "@/components/common/MessageInput";
import { Attachment, Attachments } from "@/components/attachments/Attachments";
import { Divider } from "@/components/ui";

export function TaskDetailFullCommentInput() {
  let [files, setFiles] = useState<FileList | null>(null);

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg">
      <MessageInput
        inputClassName="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 h-[7rem]"
        placeholder="Type a comment..."
        onFilesSelect={(files) => setFiles(files)}
      />

      {files && (
        <>
          <Attachments>
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
          <Divider />
        </>
      )}
    </div>
  );
}
