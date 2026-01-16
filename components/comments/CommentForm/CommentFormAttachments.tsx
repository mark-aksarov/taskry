"use client";

import Image from "next/image";
import { Attachment, Attachments } from "@/components/attachments/Attachments";

interface CommentFormAttachmentsProps {
  className?: string;
  files: FileList | null;
}

export function CommentFormAttachments({
  className,
  files,
}: CommentFormAttachmentsProps) {
  return (
    <>
      {files && (
        <Attachments className={className}>
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
    </>
  );
}
