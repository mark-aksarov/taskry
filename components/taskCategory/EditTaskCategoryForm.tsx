"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { TaskCategoryNameTextField } from "./TaskCategoryNameTextField";
import { useUpdateTaskCategoryTransition } from "./UpdateTaskCategoryTransitionContext";
import { useUpdateEntityActionState } from "@/lib/hooks/useUpdateEntityActionState";

interface EditTaskCategoryFormProps {
  taskCategoryId: number;
  nameDefaultValue: string;
  updateTaskCategory: ActionFn<ActionState, FormData>;
}

export function EditTaskCategoryForm({
  taskCategoryId,
  nameDefaultValue,
  updateTaskCategory,
}: EditTaskCategoryFormProps) {
  const t = useTranslations("taskCategories.EditTaskCategoryForm");

  const { startTransition } = useUpdateTaskCategoryTransition();

  const [state, action, isPending] = useUpdateEntityActionState({
    updateEntity: updateTaskCategory,
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
    <FormBase id="edit-task-category-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <input type="hidden" name="id" value={taskCategoryId} />
        <TaskCategoryNameTextField defaultValue={nameDefaultValue} />
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
