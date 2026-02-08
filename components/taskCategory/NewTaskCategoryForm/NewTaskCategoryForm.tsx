"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { TaskCategoryNameTextField } from "../TaskCategoryNameTextField";
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";

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

  useCloseOverlayOnActionSuccess(state);

  return (
    <FormBase
      id="new-task-category-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <TaskCategoryNameTextField />
        {state.status === "error" && (
          <ErrorBanner>{t("error.creationError")}</ErrorBanner>
        )}
      </FormBaseBody>

      <FormBaseFooter>
        <FormBaseSubmitButton label={t("submitButtonLabel")} />
      </FormBaseFooter>
    </FormBase>
  );
}
