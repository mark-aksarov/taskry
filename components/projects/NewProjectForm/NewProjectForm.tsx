"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { startTransition, useRef } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ProjectStatusSelect } from "../ProjectStatusSelect";
import { ProjectTitleTextField } from "../ProjectTitleTextField";
import { ProjectCategorySelect } from "../ProjectCategorySelect";
import { ProjectCustomerSelect } from "../ProjectCustomerSelect";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ProjectDeadlineDatePicker } from "../ProjectDeadlineDatePicker";
import { ProjectDescriptionTextField } from "../ProjectDescriptionTextField";
import { useCreateEntityActionState } from "@/lib/hooks/useCreateEntityActionState";

interface NewProjectFormProps {
  projectCategorySelectItems: { id: number; name: string }[];
  projectCustomerSelectItems: { id: number; fullName: string }[];
  createProject: ActionFn<ActionState, FormData>;
}

export function NewProjectForm({
  projectCategorySelectItems,
  projectCustomerSelectItems,
  createProject,
}: NewProjectFormProps) {
  const t = useTranslations("projects.NewProjectForm");

  // The ref is used inside reducerAction
  // ref.current is null on unmount, preventing programmatic modal close when opening another form in the same modal
  const ref = useRef<HTMLFormElement>(null);

  const [state, action, isPending] = useCreateEntityActionState({
    createEntity: createProject,
    formRef: ref,
    successMessage: t("successMessage"),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase ref={ref} id="new-project-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectTitleTextField />
        <ProjectDescriptionTextField />
        <ProjectDeadlineDatePicker />
        <ProjectStatusSelect />
        <ProjectCategorySelect items={projectCategorySelectItems} />
        <ProjectCustomerSelect items={projectCustomerSelectItems} />
        <FormErrorBanner status={state.status} isPending={isPending}>
          {state.message}
        </FormErrorBanner>
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButton
          isPending={isPending}
          label={t("submitButtonLabel")}
        />
      </FormBaseFooter>
    </FormBase>
  );
}
