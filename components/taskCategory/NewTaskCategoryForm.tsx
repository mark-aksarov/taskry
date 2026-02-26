"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
  useFormBaseActionState,
} from "@/components/common/FormBase";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { TaskCategoryNameTextField } from "./TaskCategoryNameTextField";

interface NewTaskCategoryFormProps {
  createTaskCategory: ActionFn<ActionState, FormData>;
}

export function NewTaskCategoryForm({
  createTaskCategory,
}: NewTaskCategoryFormProps) {
  const t = useTranslations("taskCategories.NewTaskCategoryForm");

  // The ref is used inside reducerAction in useFormBaseActionState.
  // ref.current in useFormBaseActionState is null on unmount, preventing programmatic modal close when opening another form.
  const ref = useRef<HTMLFormElement>(null);

  const [state, action, isPending] = useFormBaseActionState(
    createTaskCategory,
    ref,
    t("successMessage"),
  );

  return (
    <FormBase
      ref={ref}
      id="new-task-category-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <TaskCategoryNameTextField />
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
