"use client";

import {
  formDataToSearchParams,
  normalizeBooleanFields,
} from "@/lib/utils/formDataUtils";

import { useLocale } from "next-intl";
import { Form } from "react-aria-components";
import { ProjectFilters } from "@/lib/types";
import { Divider } from "@/components/ui/Divider";
import { usePathname, useRouter } from "@/i18n/navigation";
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
    <Form id="project-filter-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <ProjectFiltersFormNoActiveTasksSwitch filters={filters} />

        <Divider />

        <ProjectFiltersFormDeadlineFromDatePicker filters={filters} />
        <ProjectFiltersFormDeadlineToDatePicker filters={filters} />

        <Divider />
        <div>{projectStatusCheckboxGroup}</div>
        <Divider />
        <div>{projectCategoryCheckboxGroup}</div>
        <Divider />
        <div>{customerCheckboxGroup}</div>
        <Divider />
        <div>{userCheckboxGroup}</div>
      </div>
    </Form>
  );
}
