"use client";

import { RACForm } from "@/components/ui";

interface AuthCardFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export function AuthCardForm({ onSubmit, children }: AuthCardFormProps) {
  return (
    <RACForm onSubmit={onSubmit} className="flex flex-col gap-6">
      {children}
    </RACForm>
  );
}
