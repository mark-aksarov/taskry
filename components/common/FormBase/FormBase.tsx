// @ts-nocheck

"use client";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { Form, OverlayTriggerStateContext } from "react-aria-components";
import { startTransition, useActionState, useContext, useEffect } from "react";

export interface FormBaseProps {
  id: string;
  state: ActionState;
  action: (payload: FormData) => void;
  children?: React.ReactNode;
}

export function FormBase({ id, state, action, children }: FormBaseProps) {
  // FormBase is used inside FormBaseModal, so we need to close the modal when the form is submitted
  const context = useContext(OverlayTriggerStateContext);

  if (!context) {
    throw new Error("FormBase must be used within a OverlayTriggerProvider");
  }

  const { close } = context;

  useEffect(() => {
    if (state.status === "success") {
      close();
    }
  }, [state, close]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  return (
    <Form id={id} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">{children}</div>
    </Form>
  );
}
