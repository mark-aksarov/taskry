"use client";

import {
  DetailFormLabel,
  DetailFormSelect,
} from "@/components/common/DetailForm";
import { Item } from "react-stately";
import { CircleUserRound } from "lucide-react";
import { useTranslations } from "next-intl";

export function TaskDetailFormAssigneeSelect({
  users,
}: {
  users: { id: string; fullName: string }[];
}) {
  const t = useTranslations(
    "tasks.TaskDetailForm.TaskDetailFormAssigneeSelect",
  );

  return (
    <DetailFormSelect
      label={
        <DetailFormLabel className="w-[6rem]">
          <CircleUserRound size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("label")}
        </DetailFormLabel>
      }
      placeholder={t("placeholder")}
      items={users.map((item) => ({ id: item.id, label: item.fullName }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </DetailFormSelect>
  );
}
