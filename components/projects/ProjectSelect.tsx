"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

export function ProjectSelect({
  defaultSelectedKey,
  items,
}: {
  defaultSelectedKey?: string;
  items: { id: number; title: string }[];
}) {
  const t = useTranslations("projects.ProjectSelect");

  const withNoProjectItems = [
    { id: "", label: t("noProject") },
    ...items.map((item) => ({ id: item.id, label: item.title })),
  ];

  return (
    <ResponsiveSelect
      data-test="project-select"
      name="projectId"
      label={t("label")}
      defaultSelectedKey={defaultSelectedKey || ""}
      overlayClassName="w-[var(--trigger-width)]"
      items={withNoProjectItems}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
