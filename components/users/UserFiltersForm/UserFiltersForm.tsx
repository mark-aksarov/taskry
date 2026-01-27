"use client";

import {
  formDataToSearchParams,
  normalizeBooleanFields,
} from "@/lib/utils/formDataUtils";

import { useLocale } from "next-intl";
import { UserFilters } from "@/lib/types";
import { Form } from "react-aria-components";
import { Divider } from "@/components/ui/Divider";
import { usePathname, useRouter } from "@/i18n/navigation";
import { UserFiltersFormRoleCheckboxGroup } from "./UserFiltersFormRoleCheckboxGroup";
import { UserFiltersFormActiveTasksSwitch } from "./UserFiltersFormActiveTasksSwitch";
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
    <Form id="user-filter-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <UserFiltersFormNoActiveTasksSwitch filters={filters} />
        <Divider />

        <UserFiltersFormActiveTasksSwitch filters={filters} />
        <Divider />

        <UserFiltersFormOverdueTasksSwitch filters={filters} />
        <Divider />

        <UserFiltersFormRoleCheckboxGroup />
        <Divider />

        {positionCheckboxGroup}
      </div>
    </Form>
  );
}
