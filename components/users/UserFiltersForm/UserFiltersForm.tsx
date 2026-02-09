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
import { Divider } from "@/components/ui/Divider";
import { usePathname, useRouter } from "@/i18n/navigation";
import { UserFiltersFormRoleCheckboxGroup } from "./UserFiltersFormRoleCheckboxGroup";
import { UserFiltersFormActiveTasksSwitch } from "./UserFiltersFormActiveTasksSwitch";
import { FiltersFormSubmitButton } from "@/components/common/FiltersFormSubmitButton";
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

    router.push(`${pathname}?${searchParams.toString()}`, { locale });
  };

  return (
    <FormBase id="user-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <UserFiltersFormNoActiveTasksSwitch filters={filters} />
        <Divider />

        <UserFiltersFormActiveTasksSwitch filters={filters} />
        <Divider />

        <UserFiltersFormOverdueTasksSwitch filters={filters} />
        <Divider />

        <UserFiltersFormRoleCheckboxGroup />
        <Divider />

        {positionCheckboxGroup}
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
