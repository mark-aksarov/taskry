"use client";

import { startTransition } from "react";
import { CalendarDate } from "@internationalized/date";
import { FormBase } from "@/dashboard/common/FormBase";
import { UserBirthdateDatePicker } from "../UserBirthdateDatePicker";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { useUpdateUserBirthdate } from "../UpdateUserBirthdateContext";

export interface UpdateUserBirthdateFormProps {
  userId: string;
  birthdate?: string;
}

export function UpdateUserBirthdateForm({
  userId,
  birthdate,
}: UpdateUserBirthdateFormProps) {
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
      {userId && <input type="hidden" name="id" value={userId} />}
      <UserBirthdateDatePicker
        defaultValue={birthdateValue}
        matchTriggerWidth={false}
      />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
