"use client";

import { useSWRConfig } from "swr";
import { Form } from "react-aria-components";
import { CommentTextField } from "../CommentTextField";
import { ActionFn, ActionState } from "@/lib/actions/types";
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
      <CommentTextField
        isLoading={pending}
        textAreaClassName="bg-white dark:bg-gray-800 outline-hidden"
      />
      {hiddenInput}
    </Form>
  );
}
