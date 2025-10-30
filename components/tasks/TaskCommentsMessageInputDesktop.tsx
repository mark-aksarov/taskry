"use client";

import { useState } from "react";
import { Attachment, Attachments } from "../attachments/Attachments";
import Image from "next/image";
import { MessageInput } from "../common/MessageInput";
import { Divider } from "../ui";

export function TaskCommentsMessageInputDesktop() {
  let [files, setFiles] = useState<FileList | null>(null);

  return (
    <div className="flex flex-col gap-4 rounded-xl">
      <MessageInput
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
