"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { PositionNameTextField } from "../PositionNameTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useUpdatePositionTransition } from "../UpdatePositionTransitionContext";
import { useUpdateEntityActionState } from "@/lib/hooks/useUpdateEntityActionState";

interface EditPositionFormProps {
  positionId: number;
  nameDefaultValue: string;
  updatePosition: ActionFn<ActionState, FormData>;
}

export function EditPositionForm({
  positionId,
  nameDefaultValue,
  updatePosition,
}: EditPositionFormProps) {
  const t = useTranslations("positions.EditPositionForm");

  const { startTransition } = useUpdatePositionTransition();

  const [state, action, isPending] = useUpdateEntityActionState({
    updateEntity: updatePosition,
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
    <FormBase id="edit-position-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <input type="hidden" name="id" value={positionId} />
        <PositionNameTextField defaultValue={nameDefaultValue} />
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
