"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

export function TaskProjectSelect({
  defaultSelectedKey,
  projects,
}: {
  defaultSelectedKey?: string;
  projects: { id: number; title: string }[];
}) {
  const t = useTranslations("tasks.TaskProjectSelect");

  return (
    <ResponsiveSelect
      data-test="project-select"
      name="projectId"
      label={t("label")}
      defaultSelectedKey={defaultSelectedKey}
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      items={projects.map((item) => ({ id: item.id, label: item.title }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
