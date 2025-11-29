"use client";

import {
  DetailFormLabel,
  DetailFormSelect,
} from "@/components/common/DetailForm";
import { Item } from "react-stately";
import { FolderClosed } from "lucide-react";
import { useTranslations } from "next-intl";

export function TaskDetailFormProjectSelect({
  projects,
}: {
  projects: { id: number; title: string }[];
}) {
  const t = useTranslations("tasks.TaskDetailForm.TaskDetailFormProjectSelect");

  return (
    <DetailFormSelect
      label={
        <DetailFormLabel className="w-[6rem]">
          <FolderClosed size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("label")}
        </DetailFormLabel>
      }
      placeholder={t("placeholder")}
      items={projects.map((item) => ({ id: item.id, label: item.title }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </DetailFormSelect>
  );
}
