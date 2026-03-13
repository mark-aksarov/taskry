"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useUpdatePosition } from "./UpdatePositionContext";
import { PositionNameTextField } from "./PositionNameTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

interface EditPositionFormProps {
  positionId: number;
  nameDefaultValue: string;
}

export function EditPositionForm({
  positionId,
  nameDefaultValue,
}: EditPositionFormProps) {
  const t = useTranslations("positions.EditPositionForm");

  const { state, isPending, action } = useUpdatePosition();

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
