"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { PositionSelect } from "../../position/PositionSelect";
import { useUpdateUserPosition } from "../UpdateUserPositionContext";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";

export interface UpdateUserPositionFormProps {
  userId: string;
  positionId?: number;
  positionSelectItems: { id: number; name: string }[];
}

export function UpdateUserPositionForm({
  userId,
  positionId,
  positionSelectItems,
}: UpdateUserPositionFormProps) {
  const { state, action, isPending } = useUpdateUserPosition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-user-position-form" onSubmit={handleSubmit}>
      {userId && <input type="hidden" name="id" value={userId} />}
      <PositionSelect
        defaultSelectedKey={positionId?.toString()}
        items={positionSelectItems}
      />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
