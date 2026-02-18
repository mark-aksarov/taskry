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
import { TaskFilters } from "@/lib/types";
import { Separator } from "@/components/ui/Separator";
import { usePathname, useRouter } from "@/i18n/navigation";
import { TaskFiltersFormOnlyMyTaskSwitch } from "./TaskFiltersFormOnlyMyTaskSwitch";
import { FiltersFormSubmitButton } from "@/components/common/FiltersFormSubmitButton";
import { TaskFiltersFormDeadlineToDatePicker } from "./TaskFiltersFormDeadlineToDatePicker";
import { TaskFiltersFormDeadlineFromDatePicker } from "./TaskFiltersFormDeadlineFromDatePicker";

interface TaskFiltersFormProps {
  filters?: TaskFilters;
  statusCheckboxGroup: React.ReactNode;
  categoryCheckboxGroup: React.ReactNode;
  projectCheckboxGroup: React.ReactNode;
  assigneeCheckboxGroup: React.ReactNode;
}

export function TaskFiltersForm({
  filters,
  statusCheckboxGroup,
  categoryCheckboxGroup,
  projectCheckboxGroup,
  assigneeCheckboxGroup,
}: TaskFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    normalizeBooleanFields(formData, ["onlyMyTasks"]);
    const searchParams = formDataToSearchParams(formData);
    searchParams.delete("page");

    router.push(`${pathname}?${searchParams.toString()}`, { locale });
  };

  return (
    <FormBase id="task-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <TaskFiltersFormOnlyMyTaskSwitch filters={filters} />

        <Separator />

        <TaskFiltersFormDeadlineFromDatePicker filters={filters} />
        <TaskFiltersFormDeadlineToDatePicker filters={filters} />

        <Separator />

        <div>{statusCheckboxGroup}</div>
        <Separator />
        <div>{categoryCheckboxGroup}</div>
        <Separator />
        <div>{projectCheckboxGroup}</div>
        <Separator />
        <div>{assigneeCheckboxGroup}</div>
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
