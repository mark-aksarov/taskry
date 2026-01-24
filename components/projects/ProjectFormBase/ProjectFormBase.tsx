"use client";

import {
  Form,
  DateValue,
  OverlayTriggerStateContext,
} from "react-aria-components";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { FormErrorText } from "@/components/common/FormErrorText";
import { startTransition, useActionState, useContext, useEffect } from "react";
import { ProjectFormBaseTitleTextField } from "./ProjectFormBaseTitleTextField";
import { ProjectFormBaseDeadlineDatePicker } from "./ProjectFormBaseDeadlineDatePicker";
import { ProjectFormBaseDescriptionTextField } from "./ProjectFormBaseDescriptionTextField";

const initialState: ActionState = {
  status: null,
  message: null,
};

interface ProjectFormBaseProps {
  id: string;
  projectId?: number;
  projectTitleDefaultValue?: string;
  projectDescriptionDefaultValue?: string;
  projectDeadlineDefaultValue?: DateValue;
  projectStatusSelect: React.ReactNode;
  projectCategorySelect: React.ReactNode;
  projectCustomerSelect: React.ReactNode;
  formAction: ActionFn<ActionState, FormData>;
}

export function ProjectFormBase({
  id,
  projectId,
  projectTitleDefaultValue,
  projectDescriptionDefaultValue,
  projectDeadlineDefaultValue,
  projectStatusSelect,
  projectCategorySelect,
  projectCustomerSelect,
  formAction,
}: ProjectFormBaseProps) {
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

        {projectId && <input type="hidden" name="id" value={projectId} />}

        <ProjectFormBaseTitleTextField
          defaultValue={projectTitleDefaultValue}
        />
        <ProjectFormBaseDescriptionTextField
          defaultValue={projectDescriptionDefaultValue}
        />
        <ProjectFormBaseDeadlineDatePicker
          defaultValue={projectDeadlineDefaultValue}
        />
        {projectStatusSelect}
        {projectCategorySelect}
        {projectCustomerSelect}
      </div>
    </Form>
  );
}
