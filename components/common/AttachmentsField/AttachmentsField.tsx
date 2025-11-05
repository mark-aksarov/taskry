import { Attachment, Attachments } from "@/components/attachments/Attachments";
import { DropZone, fieldStyles, Label } from "@/components/ui";
import Image from "next/image";
import { useState } from "react";

export function AttachmentsField() {
  const [files, setFiles] = useState<FileList | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className={fieldStyles()}>
        <Label>Attachments</Label>
        <DropZone onFilesSelect={setFiles} />
      </div>

      <p className="text-end text-xs font-medium text-gray-400 dark:text-gray-500">
        Max size: 10 MB
      </p>

      {files && (
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
      )}
    </div>
  );
}
