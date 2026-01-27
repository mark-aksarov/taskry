"use client";

import { useLocale } from "next-intl";
import { TaskFilters } from "@/lib/types";
import { Form } from "react-aria-components";
import { Divider } from "@/components/ui/Divider";
import { usePathname, useRouter } from "@/i18n/navigation";
import { TaskFiltersFormOnlyMyTaskSwitch } from "./TaskFiltersFormOnlyMyTaskSwitch";
import { TaskFiltersFormDeadlineToDatePicker } from "./TaskFiltersFormDeadlineToDatePicker";
import { TaskFiltersFormDeadlineFromDatePicker } from "./TaskFiltersFormDeadlineFromDatePicker";
import {
  formDataToSearchParams,
  normalizeBooleanFields,
} from "@/lib/utils/formDataUtils";

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
    <Form id="task-filter-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <TaskFiltersFormOnlyMyTaskSwitch filters={filters} />

        <Divider />

        <TaskFiltersFormDeadlineFromDatePicker filters={filters} />
        <TaskFiltersFormDeadlineToDatePicker filters={filters} />

        <Divider />

        <div>{statusCheckboxGroup}</div>
        <Divider />
        <div>{categoryCheckboxGroup}</div>
        <Divider />
        <div>{projectCheckboxGroup}</div>
        <Divider />
        <div>{assigneeCheckboxGroup}</div>
      </div>
    </Form>
  );
}
