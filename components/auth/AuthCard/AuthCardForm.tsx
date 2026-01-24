"use client";

import { Form } from "react-aria-components";

interface AuthCardFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export function AuthCardForm({ onSubmit, children }: AuthCardFormProps) {
  return (
    <Form onSubmit={onSubmit} className="flex flex-col gap-6">
      {children}
    </Form>
  );
}
