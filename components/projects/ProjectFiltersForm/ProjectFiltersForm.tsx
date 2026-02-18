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
import { ProjectFilters } from "@/lib/types";
import { Separator } from "@/components/ui/Separator";
import { usePathname, useRouter } from "@/i18n/navigation";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    normalizeBooleanFields(formData, ["noActiveTasks"]);
    const searchParams = formDataToSearchParams(formData);
    searchParams.delete("page");

    router.push(`${pathname}?${searchParams.toString()}`, { locale });
  };

  return (
    <FormBase id="project-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectFiltersFormNoActiveTasksSwitch filters={filters} />

        <Separator />

        <ProjectFiltersFormDeadlineFromDatePicker filters={filters} />
        <ProjectFiltersFormDeadlineToDatePicker filters={filters} />

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
