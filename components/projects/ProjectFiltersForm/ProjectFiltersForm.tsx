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
import { ProjectFilters } from "@/lib/types";
import { Separator } from "@/components/ui/Separator";
import { usePathname, useRouter } from "@/i18n/navigation";
import { CalendarDate, parseDate } from "@internationalized/date";
import { FiltersFormSubmitButton } from "@/components/common/FiltersFormSubmitButton";
import { ProjectFiltersFormNoActiveTasksSwitch } from "./ProjectFiltersFormNoActiveTasksSwitch";
import { ProjectFiltersFormDeadlineToDatePicker } from "./ProjectFiltersFormDeadlineToDatePicker";
import { ProjectFiltersFormDeadlineFromDatePicker } from "./ProjectFiltersFormDeadlineFromDatePicker";

interface ProjectFiltersFormProps {
  filters?: ProjectFilters;
  projectStatusCheckboxGroup: React.ReactNode;
  projectCategoryCheckboxGroup: React.ReactNode;
  customerCheckboxGroup: React.ReactNode;
  userCheckboxGroup: React.ReactNode;
}

export function ProjectFiltersForm({
  filters,
  projectStatusCheckboxGroup,
  projectCategoryCheckboxGroup,
  customerCheckboxGroup,
  userCheckboxGroup,
}: ProjectFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // parse deadlineFrom iso date to CalendarDate
  const [deadlineFrom, setDeadlineFrom] = useState<CalendarDate | null>(() => {
    const deadlineFrom = filters?.deadlineFrom;
    if (!deadlineFrom) return null;
    return parseDate(deadlineFrom);
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    normalizeBooleanFields(formData, ["noActiveTasks"]);
    const searchParams = formDataToSearchParams(formData);
    searchParams.delete("page");

    router.replace(`${pathname}?${searchParams.toString()}`, { locale });
  };

  return (
    <FormBase id="project-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectFiltersFormNoActiveTasksSwitch filters={filters} />

        <Separator />

        <ProjectFiltersFormDeadlineFromDatePicker
          deadlineFrom={deadlineFrom}
          setDeadlineFrom={setDeadlineFrom}
        />
        <ProjectFiltersFormDeadlineToDatePicker
          filters={filters}
          deadlineFrom={deadlineFrom}
        />

        <Separator />

        <div>{projectStatusCheckboxGroup}</div>
        <Separator />
        <div>{projectCategoryCheckboxGroup}</div>
        <Separator />
        <div>{customerCheckboxGroup}</div>
        <Separator />
        <div>{userCheckboxGroup}</div>
      </FormBaseBody>

      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
