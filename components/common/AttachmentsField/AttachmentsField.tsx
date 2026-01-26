"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { DropZone } from "@/components/ui/DropZone";
import { fieldStyles, Label } from "@/components/ui/Field";
import { Attachment, Attachments } from "@/components/attachments/Attachments";

export function AttachmentsField() {
  const [files, setFiles] = useState<FileList | null>(null);
  const t = useTranslations("common.AttachmentsField");

  return (
    <div className="flex flex-col gap-4">
      <div className={fieldStyles()}>
        <Label>{t("label")}</Label>
        <DropZone onFilesSelect={setFiles} />
      </div>

      <p className="text-end text-xs font-medium text-gray-400 dark:text-gray-500">
        {t("maxSize")}
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
