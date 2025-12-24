"use client";

import { RACForm } from "@/components/ui";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { FormErrorText } from "@/components/common/FormErrorText";
import { OverlayTriggerStateContext } from "react-aria-components";
import { startTransition, useActionState, useContext, useEffect } from "react";
import { TaskCategoryFormBaseNameTextField } from "./TaskCategoryFormBaseNameTextField";

const initialState: ActionState = {
  status: null,
  message: null,
};

interface TaskCategoryFormBaseProps {
  taskId?: number;
  taskTitleDefaultValue?: string;
  formAction: ActionFn<ActionState, FormData>;
}

export function TaskCategoryFormBase({
  taskId,
  taskTitleDefaultValue,
  formAction,
}: TaskCategoryFormBaseProps) {
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
    <RACForm id="new-task-category-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        {state.status === "error" && (
          <FormErrorText>{state.message}</FormErrorText>
        )}

        {taskId && <input type="hidden" name="id" value={taskId} />}

        <TaskCategoryFormBaseNameTextField
          defaultValue={taskTitleDefaultValue}
        />
      </div>
    </RACForm>
  );
}
