"use client";

import { startTransition } from "react";
import { Form } from "react-aria-components";

interface AuthCardFormProps {
  action: (payload: FormData) => void;
  children: React.ReactNode;
}

export function AuthCardForm({ action, children }: AuthCardFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {children}
    </Form>
  );
}
