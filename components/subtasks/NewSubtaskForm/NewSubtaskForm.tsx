"use client";

import { useTranslations } from "next-intl";
import { Form } from "react-aria-components";
import { TextField } from "@/components/ui/TextField";

export function NewSubtaskForm() {
  const t = useTranslations("subtasks.NewSubtaskForm");

  return (
    <Form>
      <TextField
        inputClassName="p-3 rounded-lg"
        label={t("label")}
        placeholder={t("placeholder")}
      />
    </Form>
  );
}
