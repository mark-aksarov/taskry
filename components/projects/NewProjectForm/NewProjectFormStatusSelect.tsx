"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

export function NewProjectFormStatusSelect() {
  const t = useTranslations("projects");

  return (
    <ResponsiveSelect
      label={t("NewProjectForm.NewProjectFormStatusSelect.label")}
      placeholder={t("NewProjectForm.NewProjectFormStatusSelect.placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
    >
      <Item key="pending">{t("ProjectStatus.pending")}</Item>
      <Item key="active">{t("ProjectStatus.active")}</Item>
      <Item key="completed">{t("ProjectStatus.completed")}</Item>
    </ResponsiveSelect>
  );
}
