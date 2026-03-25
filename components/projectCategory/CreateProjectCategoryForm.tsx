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
import { useCreateProjectCategory } from "./CreateProjectCategoryContext";
import { ProjectCategoryNameTextField } from "./ProjectCategoryNameTextField";

export function CreateProjectCategoryForm() {
  const t = useTranslations("projectCategories.CreateProjectCategoryForm");

  const { state, action, isPending } = useCreateProjectCategory();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="new-project-category-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectCategoryNameTextField />
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
