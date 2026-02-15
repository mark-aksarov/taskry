"use client";

import { Form } from "react-aria-components";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";

interface AuthCardFormProps {
  action: (payload: FormData) => void;
  children: React.ReactNode;
}

export function AuthCardForm({ action, children }: AuthCardFormProps) {
  return (
    <Form
      onSubmit={(e) => handleActionSubmit(e, action, ["rememberMe"])}
      className="flex flex-col gap-6"
    >
      {children}
    </Form>
  );
}
