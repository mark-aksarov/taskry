"use client";

import { RACForm } from "@/components/ui";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useContext, useEffect } from "react";
import { FormErrorText } from "@/components/common/FormErrorText";
import { ActionFn, CreateProjectState } from "@/lib/actions/types";
import { NewProjectFormTitleTextField } from "./NewProjectFormTitleTextField";
import { NewProjectFormDescriptionTextField } from "./NewProjectFormDescriptionTextField";
import { NewProjectFormDeadlineDatePicker } from "./NewProjectFormDeadlineDatePicker";
import { OverlayTriggerStateContext } from "react-aria-components";

const initialState: CreateProjectState = {
  status: null,
  message: null,
};

interface NewProjectFormProps {
  projectStatusSelect: React.ReactNode;
  projectCategorySelect: React.ReactNode;
  projectCustomerSelect: React.ReactNode;
  createProjectAction: ActionFn<CreateProjectState, FormData>;
}

export function NewProjectForm({
  projectStatusSelect,
  projectCategorySelect,
  projectCustomerSelect,
  createProjectAction,
}: NewProjectFormProps) {
  const { close } = useContext(OverlayTriggerStateContext)!;

  const t = useTranslations("projects.NewProjectForm");
  const [state, action, pending] = useActionState(
    createProjectAction,
    initialState,
  );

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

        <NewProjectFormTitleTextField />
        <NewProjectFormDescriptionTextField />
        <NewProjectFormDeadlineDatePicker />
        {projectStatusSelect}
        {projectCategorySelect}
        {projectCustomerSelect}
      </div>
    </RACForm>
  );
}
