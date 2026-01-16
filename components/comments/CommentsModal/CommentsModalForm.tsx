"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { CommentTextField } from "../CommentTextField";
import { CommentForm, CommentFormAttachments } from "../CommentForm";

export function CommentsModalForm() {
  let [files, setFiles] = useState<FileList | null>(null);

  return (
    <CommentForm files={files}>
      {files && (
        <CommentFormAttachments
          files={files}
          className="border-b-1 border-gray-300 px-4 py-3 dark:border-gray-600"
        />
      )}
      <CommentTextField
        onFilesSelect={setFiles}
        className={twMerge("w-full")}
        textAreaClassName="bg-white dark:bg-gray-800 outline-hidden"
      />
    </CommentForm>
  );
}
