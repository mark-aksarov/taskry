"use client";

import {
  formDataToSearchParams,
  normalizeBooleanFields,
} from "@/lib/utils/formDataUtils";

import { useLocale } from "next-intl";
import { Form } from "react-aria-components";
import { CustomerFilters } from "@/lib/types";
import { Divider } from "@/components/ui/Divider";
import { usePathname, useRouter } from "@/i18n/navigation";
import { CustomerFiltersFormActiveProjectsSwitch } from "./CustomerFiltersFormActiveProjectsSwitch";
import { CustomerFiltersFormOverdueProjectsSwitch } from "./CustomerFiltersFormOverdueProjectsSwitch";
import { CustomerFiltersFormNoActiveProjectsSwitch } from "./CustomerFiltersFormNoActiveProjectsSwitch";

interface CustomerFiltersFormProps {
  filters?: CustomerFilters;
  companyCheckboxGroup: React.ReactNode;
}

export function CustomerFiltersForm({
  filters,
  companyCheckboxGroup,
}: CustomerFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    const formData = new FormData(e.currentTarget);
    normalizeBooleanFields(formData, [
      "hasActiveProjects",
      "hasOverdueProjects",
      "hasNoActiveProjects",
    ]);
    const searchParams = formDataToSearchParams(formData);
    params.delete("page");

    router.push(`${pathname}?${searchParams.toString()}`, { locale });
  };

  return (
    <Form id="customer-filter-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <CustomerFiltersFormNoActiveProjectsSwitch filters={filters} />
        <Divider />

        <CustomerFiltersFormActiveProjectsSwitch filters={filters} />
        <Divider />

        <CustomerFiltersFormOverdueProjectsSwitch filters={filters} />
        <Divider />

        {companyCheckboxGroup}
      </div>
    </Form>
  );
}
