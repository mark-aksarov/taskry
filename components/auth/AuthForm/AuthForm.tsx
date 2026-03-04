"use client";

import { startTransition } from "react";
import { Form } from "react-aria-components";
import { normalizeBooleanFields } from "@/lib/utils/formDataUtils";

interface AuthFormProps {
  action: (payload: FormData) => void;
  children: React.ReactNode;
}

export function AuthForm({ action, children }: AuthFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    normalizeBooleanFields(formData, ["rememberMe"]);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {children}
    </Form>
  );
}
