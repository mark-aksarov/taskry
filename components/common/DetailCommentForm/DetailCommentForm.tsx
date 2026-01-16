"use client";

import {
  CommentForm,
  CommentFormAttachments,
} from "@/components/comments/CommentForm";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { CommentTextField } from "@/components/comments/CommentTextField";

export function DetailCommentForm() {
  let [files, setFiles] = useState<FileList | null>(null);

  return (
    <CommentForm files={files}>
      <CommentTextField
        onFilesSelect={setFiles}
        className={twMerge("w-full")}
        textAreaClassName="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 h-[7rem]"
      />
      {files && (
        <CommentFormAttachments
          files={files}
          className="border-b-1 border-gray-300 py-3 dark:border-gray-600"
        />
      )}
    </CommentForm>
  );
}
