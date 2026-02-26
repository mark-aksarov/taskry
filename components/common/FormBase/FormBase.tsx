"use client";

import { Form, FormProps } from "react-aria-components";

export function FormBase({
  children,
  ...props
}: FormProps & React.RefAttributes<HTMLFormElement>) {
  return (
    <Form {...props} className="flex h-full flex-col gap-4">
      {children}
    </Form>
  );
}
