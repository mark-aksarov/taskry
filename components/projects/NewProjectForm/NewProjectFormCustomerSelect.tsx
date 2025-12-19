"use client";

import { Item } from "react-stately";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";
import { useTranslations } from "next-intl";

export function NewProjectFormCustomerSelect({
  customers,
}: {
  customers: { id: number; fullName: string }[];
}) {
  const t = useTranslations(
    "projects.NewProjectForm.NewProjectFormCustomerSelect",
  );

  return (
    <ResponsiveSelect
      label={t("label")}
      name="customerId"
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      items={customers.map((item) => ({ id: item.id, label: item.fullName }))}
      isRequired
      errorMessage={t("validation.required")}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
