"use client";

import { startTransition } from "react";
import { FormBase } from "@/components/common/FormBase";
import { useUpdatePosition } from "../UpdatePositionContext";
import { PositionNameTextField } from "../PositionNameTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

interface UpdatePositionFormProps {
  positionId: number;
  nameDefaultValue: string;
}

export function UpdatePositionForm({
  positionId,
  nameDefaultValue,
}: UpdatePositionFormProps) {
  const { state, isPending, action } = useUpdatePosition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-position-form" onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={positionId} />
      <PositionNameTextField defaultValue={nameDefaultValue} />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
