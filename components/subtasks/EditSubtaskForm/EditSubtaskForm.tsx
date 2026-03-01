"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { SubtaskTextField } from "../SubtaskTextField";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useUpdateSubtaskTransition } from "../UpdateSubtaskTransitionContext";
import { useUpdateEntityActionState } from "@/lib/hooks/useUpdateEntityActionState";

const initialState: ActionState = {
  status: null,
};

interface EditSubtaskFormProps {
  subtaskId: number;
  taskId: number;
  mutate?: () => void;
  textDefaultValue?: string;
  updateSubtask: ActionFn<ActionState, FormData>;
}

export function EditSubtaskForm({
  subtaskId,
  taskId,
  mutate,
  textDefaultValue,
  updateSubtask,
}: EditSubtaskFormProps) {
  const t = useTranslations("subtasks.EditSubtaskForm");

  const { startTransition } = useUpdateSubtaskTransition();

  const [state, action, isPending] = useUpdateEntityActionState({
    updateEntity: updateSubtask,
    onSuccess: mutate,
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
    <FormBase id="edit-subtask-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <input type="hidden" name="id" value={subtaskId} />
        <input type="hidden" name="taskId" value={taskId} />
        <SubtaskTextField defaultValue={textDefaultValue} />
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
