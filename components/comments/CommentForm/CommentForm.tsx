"use client";

import { useSWRConfig } from "swr";
import { Form } from "react-aria-components";
import { CommentTextField } from "../CommentTextField";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CommentFormAttachments } from "./CommentFormAttachments";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { useTranslations } from "next-intl";

const initialState: ActionState = {
  status: null,
};

interface CommentFormProps {
  sendCommentAction: ActionFn<ActionState, FormData>;
  mutateUrl: string;
  hiddenInput?: React.ReactNode;
}

export function CommentForm({
  sendCommentAction,
  mutateUrl,
  hiddenInput,
}: CommentFormProps) {
  const t = useTranslations("comments.CommentForm");

  let [files, setFiles] = useState<FileList | null>(null);

  const { mutate } = useSWRConfig();

  const [state, action, pending] = useActionState(
    sendCommentAction,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      mutate(mutateUrl);
    }
  }, [state, mutateUrl]);

  useActionErrorToast(state, t("error.sendFailed"));

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  return (
    <Form onSubmit={handleSubmit} className="flex w-full flex-col">
      {files && (
        <CommentFormAttachments
          files={files}
          className="border-b-1 border-gray-300 px-4 py-3 dark:border-gray-600"
        />
      )}
      <CommentTextField
        isLoading={pending}
        onFilesSelect={setFiles}
        textAreaClassName="bg-white dark:bg-gray-800 outline-hidden"
      />
      {hiddenInput}
    </Form>
  );
}
