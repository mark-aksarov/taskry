"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useCreatePosition } from "../CreatePositionContext";
import { PositionNameTextField } from "../PositionNameTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export function NewPositionForm() {
  const t = useTranslations("positions.NewPositionForm");

  const { state, action, isPending } = useCreatePosition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="new-position-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <PositionNameTextField />
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
