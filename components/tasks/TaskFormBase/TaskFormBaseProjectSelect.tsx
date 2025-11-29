"use client";

import { Item } from "react-stately";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";
import { useTranslations } from "next-intl";

export function TaskFormBaseProjectSelect({
  projects,
}: {
  projects: { id: number; title: string }[];
}) {
  const t = useTranslations("tasks.TaskFormBase.TaskFormBaseProjectSelect");

  return (
    <ResponsiveSelect
      label={t("label")}
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      items={projects.map((item) => ({ id: item.id, label: item.title }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
