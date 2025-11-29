"use client";

import { Item } from "react-stately";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";
import { useTranslations } from "next-intl";

export function TaskFormBaseStatusSelect() {
  const t = useTranslations("tasks.TaskFormBase.TaskFormBaseStatusSelect");

  return (
    <ResponsiveSelect
      label={t("label")}
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
    >
      <Item key="pending">{t("items.pending")}</Item>
      <Item key="active">{t("items.active")}</Item>
      <Item key="completed">{t("items.completed")}</Item>
    </ResponsiveSelect>
  );
}
