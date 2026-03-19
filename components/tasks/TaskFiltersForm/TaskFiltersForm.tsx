"use client";

import {
  DeadlineToDatePicker,
  useDeadlineToDatePicker,
} from "../DeadlineToDatePicker";

import {
  AssigneeCheckboxGroup,
  useAssigneeCheckboxGroup,
} from "../AssigneeCheckboxGroup";

import {
  DeadlineFromDatePicker,
  useDeadlineFromDatePicker,
} from "../DeadlineFromDatePicker";

import {
  TaskStatusCheckboxGroup,
  useTaskStatusCheckboxGroup,
} from "../TaskStatusCheckboxGroup";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import {
  ProjectCheckboxGroup,
  useProjectCheckboxGroup,
} from "@/components/projects/ProjectCheckboxGroup";

import {
  TaskCategoryCheckboxGroup,
  useTaskCategoryCheckboxGroup,
} from "@/components/taskCategory/TaskCategoryCheckboxGroup";

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/Separator";
import { useSelectedTasks } from "../SelectedTasksContext";
import { usePathname, useRouter } from "@/i18n/navigation";
import { OverlayTriggerStateContext } from "react-aria-components";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { usePageTransition } from "@/components/common/PageTransitionContext";
import { OnlyMyTasksSwitch, useOnlyMyTasksSwitch } from "../OnlyMyTasksSwitch";

interface TaskFiltersFormProps {
  categoryCheckboxGroupItems: { id: number; name: string }[];
  projectCheckboxGroupItems: { id: number; title: string }[];
  assigneeCheckboxGroupItems: { id: string; fullName: string }[];
}

export function TaskFiltersForm({
  categoryCheckboxGroupItems,
  projectCheckboxGroupItems,
  assigneeCheckboxGroupItems,
}: TaskFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startFilteringTransition } = usePageTransition();
  const { clear: clearSelectedItems } = useSelectedTasks();

  // TaskFiltersForm can only be used inside the TaskFiltersModal
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;

  const { isSelected: onlyMyTasks } = useOnlyMyTasksSwitch();
  const { value: deadlineFrom } = useDeadlineFromDatePicker();
  const { value: deadlineTo } = useDeadlineToDatePicker();
  const { value: projectIds } = useProjectCheckboxGroup();
  const { value: categoryIds } = useTaskCategoryCheckboxGroup();
  const { value: assigneeIds } = useAssigneeCheckboxGroup();
  const { value: statuses } = useTaskStatusCheckboxGroup();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Remove old filter values before applying new ones
    newSearchParams.delete("onlyMyTasks");
    newSearchParams.delete("deadlineFrom");
    newSearchParams.delete("deadlineTo");
    newSearchParams.delete("projectIds");
    newSearchParams.delete("categoryIds");
    newSearchParams.delete("assigneeIds");
    newSearchParams.delete("statuses");

    // Add new filter values
    if (onlyMyTasks) {
      newSearchParams.set("onlyMyTasks", "true");
    }
    if (deadlineFrom) {
      // toString convert date to ISO 8601, e.g. '2022-02-03'
      newSearchParams.set("deadlineFrom", deadlineFrom.toString());
    }
    if (deadlineTo) {
      newSearchParams.set("deadlineTo", deadlineTo.toString());
    }
    statuses.forEach((status) => newSearchParams.append("statuses", status));
    projectIds.forEach((id) => newSearchParams.append("projectIds", id));
    categoryIds.forEach((id) => newSearchParams.append("categoryIds", id));
    assigneeIds.forEach((id) => newSearchParams.append("assigneeIds", id));

    // Reset pagination
    newSearchParams.delete("page");

    // Clear the selected items in list / grid
    clearSelectedItems?.();

    // Start the page transition and update the URL with new search params
    startFilteringTransition(() => {
      router.replace(`${pathname}?${newSearchParams}`, { locale });
    });
  };

  return (
    <FormBase id="task-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <OnlyMyTasksSwitch />

        <Separator />

        <DeadlineFromDatePicker />
        <DeadlineToDatePicker />

        <Separator />

        <TaskStatusCheckboxGroup />
        <Separator />

        <TaskCategoryCheckboxGroup items={categoryCheckboxGroupItems} />
        <Separator />

        <ProjectCheckboxGroup items={projectCheckboxGroupItems} />
        <Separator />

        <AssigneeCheckboxGroup items={assigneeCheckboxGroupItems} />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
