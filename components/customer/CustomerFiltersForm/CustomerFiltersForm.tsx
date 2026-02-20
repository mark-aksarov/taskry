"use client";

import {
  formDataToSearchParams,
  normalizeBooleanFields,
} from "@/lib/utils/formDataUtils";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useLocale } from "next-intl";
import { CustomerFilters } from "@/lib/types";
import { Separator } from "@/components/ui/Separator";
import { usePathname, useRouter } from "@/i18n/navigation";
import { FiltersFormSubmitButton } from "@/components/common/FiltersFormSubmitButton";
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
    <FormBase id="customer-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <CustomerFiltersFormNoActiveProjectsSwitch filters={filters} />
        <Separator />

        <CustomerFiltersFormActiveProjectsSwitch filters={filters} />
        <Separator />

        <CustomerFiltersFormOverdueProjectsSwitch filters={filters} />
        <Separator />

        <div>{companyCheckboxGroup}</div>
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
