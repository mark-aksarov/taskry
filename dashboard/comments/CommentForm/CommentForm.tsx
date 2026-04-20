"use client";

import { startTransition } from "react";
import { Form } from "react-aria-components";
import { CommentTextField } from "../CommentTextField";
import { useCommentFormContext } from "../CommentFormContext";

interface CommentFormProps {
  action: (formData: FormData) => void;
  isPending: boolean;
}

export function CommentForm({ action, isPending }: CommentFormProps) {
  const { editCommentId, entityId, entityKey } = useCommentFormContext();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => action(formData));
  }

  /**
   * If editing - send comment "id"
   * If creating - send entity reference (entityKey - entityId)
   */
  const hiddenName = editCommentId ? "id" : entityKey;
  const hiddenValue = editCommentId ? editCommentId : entityId;

  return (
    <Form onSubmit={handleSubmit} className="flex w-full flex-col">
      <CommentTextField
        isPending={isPending}
        textAreaClassName="bg-white dark:bg-gray-800 outline-hidden"
      />
      <input type="hidden" name={hiddenName} value={hiddenValue} />
    </Form>
  );
}
