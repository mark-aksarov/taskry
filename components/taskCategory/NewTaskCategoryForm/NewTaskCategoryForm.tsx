"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ErrorBanner } from "../../common/ErrorBanner";
import { FormBase } from "@/components/common/FormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { TaskCategoryNameTextField } from "../TaskCategoryNameTextField";

const initialState: ActionState = {
  status: null,
};

interface NewTaskCategoryFormProps {
  createTaskCategory: ActionFn<ActionState, FormData>;
}

export function NewTaskCategoryForm({
  createTaskCategory,
}: NewTaskCategoryFormProps) {
  const t = useTranslations("taskCategories.NewTaskCategoryForm");

  const [state, action, pending] = useActionState(
    createTaskCategory,
    initialState,
  );

  return (
    <FormBase id="new-task-category-form" state={state} action={action}>
      <TaskCategoryNameTextField />
      {state.status === "error" && (
        <ErrorBanner>{t("error.creationError")}</ErrorBanner>
      )}
    </FormBase>
  );
}
