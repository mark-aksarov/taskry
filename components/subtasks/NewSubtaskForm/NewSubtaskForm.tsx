"use client";

import { RACForm, TextField } from "@/components/ui";
import { useTranslations } from "next-intl";

export function NewSubtaskForm() {
  const t = useTranslations("subtasks.NewSubtaskForm");

  return (
    <RACForm>
      <TextField
        inputClassName="p-3 rounded-lg"
        label={t("label")}
        placeholder={t("placeholder")}
      />
    </RACForm>
  );
}
