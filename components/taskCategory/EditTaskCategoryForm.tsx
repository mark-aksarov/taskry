"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
  useFormBaseActionState,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { TaskCategoryNameTextField } from "./TaskCategoryNameTextField";

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

  const [state, action, isPending] = useFormBaseActionState(updateTaskCategory);

  return (
    <FormBase
      id="edit-task-category-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
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
