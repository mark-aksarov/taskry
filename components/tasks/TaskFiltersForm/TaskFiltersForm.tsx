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

import { useState } from "react";
import { useLocale } from "next-intl";
import { TaskFilters } from "@/lib/types";
import { Separator } from "@/components/ui/Separator";
import { usePathname, useRouter } from "@/i18n/navigation";
import { CalendarDate, parseDate } from "@internationalized/date";
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

  // parse deadlineFrom to CalendarDate without time components
  const [deadlineFrom, setDeadlineFrom] = useState<CalendarDate | null>(() => {
    const deadlineFrom = filters?.deadlineFrom;
    if (!deadlineFrom) return null;
    return parseDate(deadlineFrom);
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    normalizeBooleanFields(formData, ["onlyMyTasks"]);
    const searchParams = formDataToSearchParams(formData);
    searchParams.delete("page");

    router.replace(`${pathname}?${searchParams.toString()}`, { locale });
  };

  return (
    <FormBase id="task-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <TaskFiltersFormOnlyMyTaskSwitch filters={filters} />

        <Separator />

        <TaskFiltersFormDeadlineFromDatePicker
          deadlineFrom={deadlineFrom}
          setDeadlineFrom={setDeadlineFrom}
        />
        <TaskFiltersFormDeadlineToDatePicker
          filters={filters}
          deadlineFrom={deadlineFrom}
        />

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
