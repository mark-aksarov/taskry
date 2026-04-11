"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { PositionSelect } from "../../position/PositionSelect";
import { useUpdateUserPosition } from "../UpdateUserPositionContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

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
  const t = useTranslations("users.UpdateUserPositionForm");

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
      <FormBaseBody>
        {userId && <input type="hidden" name="id" value={userId} />}
        <PositionSelect
          defaultSelectedKey={positionId?.toString()}
          items={positionSelectItems}
        />

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
