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
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
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

  const [state, action, isPending] = useActionState(
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
        <FormErrorBanner status={state.status} isPending={isPending}>
          {t("error.creationError")}
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
