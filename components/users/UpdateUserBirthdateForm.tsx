"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { CalendarDate } from "@internationalized/date";
import { UserBirthdateDatePicker } from "./UserBirthdateDatePicker";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useUpdateUserBirthdate } from "./UpdateUserBirthdateContext";

export interface UpdateUserBirthdateFormProps {
  userId: string;
  birthdate?: string;
}

export function UpdateUserBirthdateForm({
  userId,
  birthdate,
}: UpdateUserBirthdateFormProps) {
  const t = useTranslations("users.UpdateUserForm");

  const { state, action, isPending } = useUpdateUserBirthdate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  let birthdateValue;
  if (birthdate) {
    const d = new Date(birthdate);
    birthdateValue = new CalendarDate(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate(),
    );
  }

  return (
    <FormBase id="update-user-birthdate-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {userId && <input type="hidden" name="id" value={userId} />}
        <UserBirthdateDatePicker
          defaultValue={birthdateValue}
          matchTriggerWidth={false}
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
