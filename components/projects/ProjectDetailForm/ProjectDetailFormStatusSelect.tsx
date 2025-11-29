"use client";

import {
  DetailFormLabel,
  DetailFormSelect,
} from "@/components/common/DetailForm";

import { Item } from "react-stately";
import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProjectDetailFormStatusSelect() {
  const t = useTranslations("projects.ProjectDetailForm.statusSelect");

  return (
    <DetailFormSelect
      label={
        <DetailFormLabel className="w-[6rem]">
          <CircleCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("label")}
        </DetailFormLabel>
      }
      placeholder={t("placeholder")}
    >
      <Item key="pending">{t("items.pending")}</Item>
      <Item key="active">{t("items.active")}</Item>
      <Item key="completed">{t("items.completed")}</Item>
    </DetailFormSelect>
  );
}
