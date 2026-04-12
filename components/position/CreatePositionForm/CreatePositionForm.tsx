"use client";

import { startTransition } from "react";
import { FormBase } from "@/components/common/FormBase";
import { useCreatePosition } from "../CreatePositionContext";
import { PositionNameTextField } from "../PositionNameTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export function CreatePositionForm() {
  const { state, action, isPending } = useCreatePosition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="create-position-form" onSubmit={handleSubmit}>
      <PositionNameTextField />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
