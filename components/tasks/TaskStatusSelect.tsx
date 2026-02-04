"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

interface TaskStatusSelectProps {
  defaultSelectedKey?: string;
}

export function TaskStatusSelect({
  defaultSelectedKey,
}: TaskStatusSelectProps) {
  const t = useTranslations("tasks.TaskStatusSelect");
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
