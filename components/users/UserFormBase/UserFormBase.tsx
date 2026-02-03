"use client";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { FormErrorText } from "@/components/common/FormErrorText";
import { Form, OverlayTriggerStateContext } from "react-aria-components";
import { startTransition, useActionState, useContext, useEffect } from "react";

const initialState: ActionState = {
  status: null,
  message: null,
};

export interface UserFormBaseProps {
  id: string;
  children: React.ReactNode;
  formAction: ActionFn<ActionState, FormData>;
}

export function UserFormBase({ id, children, formAction }: UserFormBaseProps) {
  const { close } = useContext(OverlayTriggerStateContext)!;

  const [state, action, pending] = useActionState(formAction, initialState);

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
      <div className="flex flex-col gap-4">
        {state.status === "error" && (
          <FormErrorText>{state.message}</FormErrorText>
        )}

        {children}
      </div>
    </Form>
  );
}
