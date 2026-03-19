"use client";

import {
  useTaskFiltersForm,
  useTaskFiltersFormDispatch,
} from "./TaskFiltersFormContext";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { TaskStatus } from "@/generated/prisma/enums";
import { Separator } from "@/components/ui/Separator";
import { OnlyMyTasksSwitch } from "../OnlyMyTasksSwitch";
import { useSelectedTasks } from "../SelectedTasksContext";
import { usePathname, useRouter } from "@/i18n/navigation";
import { AssigneeCheckboxGroup } from "../AssigneeCheckboxGroup";
import { OverlayTriggerStateContext } from "react-aria-components";
import { TaskStatusCheckboxGroup } from "../TaskStatusCheckboxGroup";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { usePageTransition } from "@/components/common/PageTransitionContext";
import { DeadlineToDatePicker } from "@/components/common/DeadlineToDatePicker";
import { ProjectCheckboxGroup } from "@/components/projects/ProjectCheckboxGroup";
import { DeadlineFromDatePicker } from "@/components/common/DeadlineFromDatePicker";
import { TaskCategoryCheckboxGroup } from "@/components/taskCategory/TaskCategoryCheckboxGroup";

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

  const {
    onlyMyTasks,
    deadlineFrom,
    deadlineTo,
    projectIds,
    categoryIds,
    assigneeIds,
    statuses,
  } = useTaskFiltersForm();

  const dispatch = useTaskFiltersFormDispatch();

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
        <OnlyMyTasksSwitch
          isSelected={onlyMyTasks}
          onChange={(value) =>
            dispatch({ type: "changeOnlyMyTasks", payload: value })
          }
        />

        <Separator />

        <DeadlineFromDatePicker
          value={deadlineFrom}
          onChange={(value) =>
            dispatch({ type: "changeDeadlineFrom", payload: value })
          }
        />
        <DeadlineToDatePicker
          value={deadlineTo}
          deadlineFromValue={deadlineFrom}
          onChange={(value) =>
            dispatch({ type: "changeDeadlineTo", payload: value })
          }
        />

        <Separator />

        <TaskStatusCheckboxGroup
          value={statuses}
          onChange={(value) =>
            dispatch({ type: "setStatuses", payload: value as TaskStatus[] })
          }
        />
        <Separator />

        <TaskCategoryCheckboxGroup
          items={categoryCheckboxGroupItems}
          value={categoryIds}
          onChange={(value) =>
            dispatch({ type: "setCategoryIds", payload: value })
          }
        />
        <Separator />

        <ProjectCheckboxGroup
          items={projectCheckboxGroupItems}
          value={projectIds}
          onChange={(value) =>
            dispatch({ type: "setProjectIds", payload: value })
          }
        />
        <Separator />

        <AssigneeCheckboxGroup
          items={assigneeCheckboxGroupItems}
          value={assigneeIds}
          onChange={(value) =>
            dispatch({ type: "setAssigneeIds", payload: value })
          }
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
