"use client";

import {
  DetailFormLabel,
  DetailFormSelect,
} from "@/components/common/DetailForm";
import { Item } from "react-stately";
import { Contact } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProjectDetailFormCustomerSelect({
  customers,
}: {
  customers: { id: number; fullName: string }[];
}) {
  const t = useTranslations("projects.ProjectDetailForm.customerSelect");

  return (
    <DetailFormSelect
      label={
        <DetailFormLabel className="w-[6rem]">
          <Contact size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("label")}
        </DetailFormLabel>
      }
      placeholder={t("placeholder")}
      items={customers.map((item) => ({ id: item.id, label: item.fullName }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </DetailFormSelect>
  );
}
