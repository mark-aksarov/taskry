"use client";

import { RACForm } from "../ui";

interface AuthCardFormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export function AuthCardForm({ onSubmit, children }: AuthCardFormProps) {
  return (
    <RACForm onSubmit={onSubmit} className="flex flex-col gap-6">
      {children}
    </RACForm>
  );
}
