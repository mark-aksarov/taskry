"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

interface ProjectStatusSelectProps {
  defaultSelectedKey?: string;
}

export function ProjectStatusSelect({
  defaultSelectedKey,
}: ProjectStatusSelectProps) {
  const t = useTranslations("projects.ProjectStatusSelect");
  const tStatus = useTranslations("projects.ProjectStatus");

  return (
    <ResponsiveSelect
      data-test="status-select"
      name="status"
      label={t("label")}
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      isRequired
      defaultSelectedKey={defaultSelectedKey}
      errorMessage={t("validation.required")}
    >
      <Item key="pending">{tStatus("pending")}</Item>
      <Item key="active">{tStatus("active")}</Item>
      <Item key="completed">{tStatus("completed")}</Item>
    </ResponsiveSelect>
  );
}
