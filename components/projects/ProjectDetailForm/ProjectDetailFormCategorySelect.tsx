"use client";

import {
  DetailFormLabel,
  DetailFormSelect,
} from "@/components/common/DetailForm";
import { Item } from "react-stately";
import { Blocks } from "lucide-react";

export function ProjectDetailFormCategorySelect({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  return (
    <DetailFormSelect
      label={
        <DetailFormLabel className="w-[6rem]">
          <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
          Category
        </DetailFormLabel>
      }
      items={categories.map((item) => ({ id: item.id, label: item.name }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </DetailFormSelect>
  );
}
