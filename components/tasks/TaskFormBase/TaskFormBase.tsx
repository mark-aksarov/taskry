"use client";

import {
  Form,
  DateValue,
  OverlayTriggerStateContext,
} from "react-aria-components";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { FormErrorText } from "@/components/common/FormErrorText";
import { TaskFormBaseTitleTextField } from "./TaskFormBaseTitleTextField";
import { startTransition, useActionState, useContext, useEffect } from "react";
import { TaskFormBaseDeadlineDatePicker } from "./TaskFormBaseDeadlineDatePicker";
import { TaskFormBaseDescriptionTextField } from "./TaskFormBaseDescriptionTextField";

const initialState: ActionState = {
  status: null,
  message: null,
};

export interface TaskFormBaseProps {
  id: string;
  taskId?: number;
  taskTitleDefaultValue?: string;
  taskDescriptionDefaultValue?: string;
  taskDeadlineDefaultValue?: DateValue;
  taskStatusSelect: React.ReactNode;
  taskCategorySelect: React.ReactNode;
  projectSelect: React.ReactNode;
  assigneeSelect: React.ReactNode;
  formAction: ActionFn<ActionState, FormData>;
}

export function TaskFormBase({
  id,
  taskId,
  taskTitleDefaultValue,
  taskDescriptionDefaultValue,
  taskDeadlineDefaultValue,
  taskStatusSelect,
  taskCategorySelect,
  projectSelect,
  assigneeSelect,
  formAction,
}: TaskFormBaseProps) {
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

        {taskId && <input type="hidden" name="id" value={taskId} />}

        <TaskFormBaseTitleTextField defaultValue={taskTitleDefaultValue} />
        <TaskFormBaseDescriptionTextField
          defaultValue={taskDescriptionDefaultValue}
        />
        <TaskFormBaseDeadlineDatePicker
          defaultValue={taskDeadlineDefaultValue}
        />
        {taskStatusSelect}
        {taskCategorySelect}
        {projectSelect}
        {assigneeSelect}
      </div>
    </Form>
  );
}
