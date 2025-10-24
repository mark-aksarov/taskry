"use client";

import { useState } from "react";
import { Attachment, Attachments } from "../attachments/Attachments";
import Image from "next/image";
import { MessageInput } from "../common/MessageInput";
import { Card } from "../common/Card";
import { Divider } from "../ui";

export function TaskCommentsMessageInput() {
  let [files, setFiles] = useState<FileList | null>(null);

  return (
    <>
      <Card className="flex flex-col rounded-xl p-0 md:hidden">
        <MessageInput
          inputClassName="bg-white dark:bg-gray-800 outline-none"
          placeholder="Type a comment..."
          onFilesSelect={(files) => setFiles(files)}
        />

        {files && (
          <>
            <Divider className="mx-4" />
            <Attachments className="p-4">
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

      <div className="flex flex-col gap-4 rounded-xl max-md:hidden">
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
    </>
  );
}
