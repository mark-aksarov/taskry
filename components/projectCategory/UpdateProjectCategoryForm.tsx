"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useUpdateProjectCategory } from "./UpdateProjectCategoryContext";
import { ProjectCategoryNameTextField } from "./ProjectCategoryNameTextField";

interface UpdateProjectCategoryFormProps {
  projectCategoryId: number;
  nameDefaultValue: string;
}

export function UpdateProjectCategoryForm({
  projectCategoryId,
  nameDefaultValue,
}: UpdateProjectCategoryFormProps) {
  const t = useTranslations("projectCategories.UpdateProjectCategoryForm");

  const { state, isPending, action } = useUpdateProjectCategory();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="edit-project-category-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <input type="hidden" name="id" value={projectCategoryId} />
        <ProjectCategoryNameTextField defaultValue={nameDefaultValue} />
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
