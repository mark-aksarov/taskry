"use client";

import {
  ActionFn,
  CreateProjectState,
  UpdateProjectState,
} from "@/lib/actions/types";
import { RACForm } from "@/components/ui";
import { FormErrorText } from "@/components/common/FormErrorText";
import { OverlayTriggerStateContext } from "react-aria-components";
import { startTransition, useActionState, useContext, useEffect } from "react";
import { ProjectCategoryFormBaseNameTextField } from "./ProjectCategoryFormBaseNameTextField";

const initialState: CreateProjectState = {
  status: null,
  message: null,
};

interface ProjectCategoryFormBaseProps {
  projectId?: number;
  projectTitleDefaultValue?: string;
  formAction: ActionFn<CreateProjectState | UpdateProjectState, FormData>;
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
    <RACForm id="new-project-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        {state.status === "error" && (
          <FormErrorText>{state.message}</FormErrorText>
        )}

        {projectId && <input type="hidden" name="id" value={projectId} />}

        <ProjectCategoryFormBaseNameTextField
          defaultValue={projectTitleDefaultValue}
        />
      </div>
    </RACForm>
  );
}
