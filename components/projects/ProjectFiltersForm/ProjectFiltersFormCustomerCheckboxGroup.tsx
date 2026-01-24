"use client";

import { Checkbox, CheckboxGroup } from "@/components/ui";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export function ProjectFiltersFormCustomerCheckboxGroup({
  customers,
}: {
  customers: { id: number; fullName: string }[];
}) {
  const t = useTranslations("projects.ProjectFiltersFormCustomerCheckboxGroup");

  const searchParams = useSearchParams();
  const initialValues = searchParams.get("customer")?.split(",") || [];

  return (
    <CheckboxGroup
      name="customer"
      label={t("label")}
      defaultValue={initialValues}
    >
      {customers.map((customer) => (
        <Checkbox
          data-test={`customer-${customer.id}-checkbox`}
          key={customer.id}
          value={customer.id.toString()}
          className="font-normal capitalize"
        >
          {customer.fullName}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
