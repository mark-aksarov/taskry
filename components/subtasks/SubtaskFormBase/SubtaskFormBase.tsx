"use client";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { FormErrorText } from "@/components/common/FormErrorText";
import { SubtaskFormBaseTextField } from "./SubtaskFormBaseTextField";
import { Form, OverlayTriggerStateContext } from "react-aria-components";
import { startTransition, useActionState, useContext, useEffect } from "react";

const initialState: ActionState = {
  status: null,
  message: null,
};

export interface SubtaskFormBaseProps {
  id: string;
  subtaskId?: number;
  taskId?: number;
  subtaskTextDefaultValue?: string;
  formAction: ActionFn<ActionState, FormData>;
  mutate?: () => void;
}

export function SubtaskFormBase({
  id,
  subtaskId,
  taskId,
  subtaskTextDefaultValue,
  formAction,
  mutate,
}: SubtaskFormBaseProps) {
  const { close } = useContext(OverlayTriggerStateContext)!;

  const [state, action, pending] = useActionState(formAction, initialState);

  useEffect(() => {
    if (state.status === "success") {
      mutate?.();
      close();
    }
  }, [mutate, state, close]);

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

        {subtaskId && <input type="hidden" name="id" value={subtaskId} />}
        {taskId && <input type="hidden" name="taskId" value={taskId} />}

        <SubtaskFormBaseTextField defaultValue={subtaskTextDefaultValue} />
      </div>
    </Form>
  );
}
