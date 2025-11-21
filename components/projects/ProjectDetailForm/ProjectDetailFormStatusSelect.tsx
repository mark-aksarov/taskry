"use client";

import {
  DetailFormLabel,
  DetailFormSelect,
} from "@/components/common/DetailForm";
import { Item } from "react-stately";
import { CircleCheck } from "lucide-react";

export function ProjectDetailFormStatusSelect({
  statuses,
}: {
  statuses: { id: string; name: string }[];
}) {
  return (
    <DetailFormSelect
      label={
        <DetailFormLabel className="w-[6rem]">
          <CircleCheck size={16} strokeWidth={1.5} absoluteStrokeWidth /> Status
        </DetailFormLabel>
      }
      items={statuses.map((item) => ({ id: item.id, label: item.name }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </DetailFormSelect>
  );
}
