"use client";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { FormErrorText } from "@/components/common/FormErrorText";
import { Form, OverlayTriggerStateContext } from "react-aria-components";
import { startTransition, useActionState, useContext, useEffect } from "react";
import { ProjectCategoryFormBaseNameTextField } from "./ProjectCategoryFormBaseNameTextField";

const initialState: ActionState = {
  status: null,
  message: null,
};

interface ProjectCategoryFormBaseProps {
  projectId?: number;
  projectTitleDefaultValue?: string;
  formAction: ActionFn<ActionState, FormData>;
}

export function ProjectCategoryFormBase({
  projectId,
  projectTitleDefaultValue,
  formAction,
}: ProjectCategoryFormBaseProps) {
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
    <Form id="new-project-category-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        {state.status === "error" && (
          <FormErrorText>{state.message}</FormErrorText>
        )}

        {projectId && <input type="hidden" name="id" value={projectId} />}

        <ProjectCategoryFormBaseNameTextField
          defaultValue={projectTitleDefaultValue}
        />
      </div>
    </Form>
  );
}
