"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ErrorBanner } from "../../common/ErrorBanner";
import { FormBase } from "@/components/common/FormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ProjectCategoryNameTextField } from "../ProjectCategoryNameTextField";

const initialState: ActionState = {
  status: null,
};

interface NewProjectCategoryFormProps {
  createProjectCategory: ActionFn<ActionState, FormData>;
}

export function NewProjectCategoryForm({
  createProjectCategory,
}: NewProjectCategoryFormProps) {
  const t = useTranslations("projectCategories.NewProjectCategoryForm");

  const [state, action, pending] = useActionState(
    createProjectCategory,
    initialState,
  );

  return (
    <FormBase id="new-project-category-form" state={state} action={action}>
      <ProjectCategoryNameTextField />
      {state.status === "error" && (
        <ErrorBanner>{t("error.creationError")}</ErrorBanner>
      )}
    </FormBase>
  );
}
