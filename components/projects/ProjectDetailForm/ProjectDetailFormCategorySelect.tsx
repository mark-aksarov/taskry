"use client";

import {
  DetailFormLabel,
  DetailFormSelect,
} from "@/components/common/DetailForm";
import { Item } from "react-stately";
import { Blocks } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProjectDetailFormCategorySelect({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const t = useTranslations("projects.ProjectDetailForm.categorySelect");

  return (
    <DetailFormSelect
      label={
        <DetailFormLabel className="w-[6rem]">
          <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("label")}
        </DetailFormLabel>
      }
      placeholder={t("placeholder")}
      items={categories.map((item) => ({ id: item.id, label: item.name }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </DetailFormSelect>
  );
}
