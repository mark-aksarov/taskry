"use client";

import { RACForm } from "@/components/ui";

interface AuthCardFormProps {
  action: (data: FormData) => void;
  children: React.ReactNode;
}

export function AuthCardForm({ action, children }: AuthCardFormProps) {
  return (
    <RACForm action={action} className="flex flex-col gap-6">
      {children}
    </RACForm>
  );
}
