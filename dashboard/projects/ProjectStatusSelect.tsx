"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/common/ResponsiveSelect";

interface ProjectStatusSelectProps {
  defaultSelectedKey?: string;
}

export function ProjectStatusSelect({
  defaultSelectedKey,
}: ProjectStatusSelectProps) {
  const tStatus = useTranslations("dashboard.projects.ProjectStatus");
  const t = useTranslations("dashboard.projects.ProjectStatusSelect");

  return (
    <ResponsiveSelect
      data-test="project-status-select"
      name="status"
      label={t("label")}
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      isRequired
      defaultSelectedKey={defaultSelectedKey || "active"}
      errorMessage={t("validation.required")}
    >
      <Item key="pending">{tStatus("pending")}</Item>
      <Item key="active">{tStatus("active")}</Item>
      <Item key="completed">{tStatus("completed")}</Item>
    </ResponsiveSelect>
  );
}
