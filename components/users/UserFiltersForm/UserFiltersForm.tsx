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
import { UserFilters } from "@/lib/types";
import { Separator } from "@/components/ui/Separator";
import { usePathname, useRouter } from "@/i18n/navigation";
import { UserFiltersFormActiveTasksSwitch } from "./UserFiltersFormActiveTasksSwitch";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm/FiltersFormSubmitButton";
import { UserFiltersFormOverdueTasksSwitch } from "./UserFiltersFormOverdueTasksSwitch";
import { UserFiltersFormNoActiveTasksSwitch } from "./UserFiltersFormNoActiveTasksSwitch";

interface UserFiltersFormProps {
  filters?: UserFilters;
  positionCheckboxGroup: React.ReactNode;
}

export function UserFiltersForm({
  filters,
  positionCheckboxGroup,
}: UserFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    const formData = new FormData(e.currentTarget);
    normalizeBooleanFields(formData, [
      "hasActiveTasks",
      "hasOverdueTasks",
      "hasNoActiveTasks",
    ]);
    const searchParams = formDataToSearchParams(formData);
    params.delete("page");

    router.replace(`${pathname}?${searchParams.toString()}`, { locale });
  };

  return (
    <FormBase id="user-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <UserFiltersFormNoActiveTasksSwitch filters={filters} />
        <Separator />

        <UserFiltersFormActiveTasksSwitch filters={filters} />
        <Separator />

        <UserFiltersFormOverdueTasksSwitch filters={filters} />
        <Separator />

        <div>{positionCheckboxGroup}</div>
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
