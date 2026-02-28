"use client";

import { useSWRConfig } from "swr";
import { Form } from "react-aria-components";
import { CommentTextField } from "../CommentTextField";
import { startTransition, useActionState } from "react";
import { useErrorToast } from "@/lib/hooks/useErrorToast";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useCommentFormContext } from "../CommentFormContext";

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
  const { mutate } = useSWRConfig();

  const { add: addErrorToast, close: closeErrorToast } = useErrorToast();
  const { setCommentContent } = useCommentFormContext();

  const [, action, isPending] = useActionState(
    async (prevState: ActionState, payload: FormData) => {
      const newState = await sendCommentAction(prevState, payload);

      closeErrorToast();

      if (newState.status === "success") {
        await mutate(mutateUrl);
        setCommentContent("");
      } else if (newState.status === "error" && newState.message) {
        addErrorToast(newState.message);
      }

      return newState;
    },
    initialState,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  return (
    <Form onSubmit={handleSubmit} className="flex w-full flex-col">
      <CommentTextField
        isPending={isPending}
        textAreaClassName="bg-white dark:bg-gray-800 outline-hidden"
      />
      {hiddenInput}
    </Form>
  );
}
