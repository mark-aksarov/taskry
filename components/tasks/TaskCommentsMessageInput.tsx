"use client";

import { useState } from "react";
import { Attachment, Attachments } from "../common/Attachments";
import Image from "next/image";
import { MessageInput } from "../common/MessageInput";
import { Card } from "../common/Card";
import { Divider } from "../ui";

export function TaskCommentsMessageInput() {
  let [files, setFiles] = useState<FileList | null>(null);

  return (
    <Card className="flex flex-col p-0">
      <MessageInput
        inputClassName="bg-white dark:bg-gray-800 outline-none"
        placeholder="Type a comment..."
        onFilesSelect={(files) => setFiles(files)}
      />

      {files && (
        <>
          <Divider />
          <Attachments className="px-4 py-3">
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
        </>
      )}
    </Card>
  );
}
