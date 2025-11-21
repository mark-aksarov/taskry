"use client";

import {
  DetailFormLabel,
  DetailFormSelect,
} from "@/components/common/DetailForm";
import { Item } from "react-stately";
import { Contact } from "lucide-react";

export function ProjectDetailFormCustomerSelect({
  customers,
}: {
  customers: { id: number; fullName: string }[];
}) {
  return (
    <DetailFormSelect
      label={
        <DetailFormLabel className="w-[6rem]">
          <Contact size={16} strokeWidth={1.5} absoluteStrokeWidth />
          Customer
        </DetailFormLabel>
      }
      items={customers.map((item) => ({ id: item.id, label: item.fullName }))}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </DetailFormSelect>
  );
}
