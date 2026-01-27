"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

interface TaskFormBaseStatusSelectProps {
  defaultSelectedKey?: string;
}

export function TaskFormBaseStatusSelect({
  defaultSelectedKey,
}: TaskFormBaseStatusSelectProps) {
  const t = useTranslations("tasks.TaskFormBaseStatusSelect");
  const tStatus = useTranslations("tasks.TaskStatus");

  return (
    <ResponsiveSelect
      data-test="status-select"
      name="status"
      label={t("label")}
      defaultSelectedKey={defaultSelectedKey}
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
    >
      <Item key="pending">{tStatus("pending")}</Item>
      <Item key="active">{tStatus("active")}</Item>
      <Item key="completed">{tStatus("completed")}</Item>
    </ResponsiveSelect>
  );
}
