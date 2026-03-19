"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import {
  useTaskFiltersForm,
  useTaskFiltersFormDispatch,
} from "../TaskFiltersForm/TaskFiltersFormContext";

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSelectedTasks } from "../SelectedTasksContext";
import { OverlayTriggerStateContext } from "react-aria-components";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { usePageTransition } from "@/components/common/PageTransitionContext";
import { TaskCategoryCheckboxGroup } from "@/components/taskCategory/TaskCategoryCheckboxGroup";

interface TaskCategoryFiltersFormProps {
  categoryCheckboxGroupItems: { id: number; name: string }[];
}

export function TaskCategoryFiltersForm({
  categoryCheckboxGroupItems,
}: TaskCategoryFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startFilteringTransition } = usePageTransition();
  const { clear: clearSelectedTasks } = useSelectedTasks();

  // TaskCategoryFiltersForm can only be used inside the TaskCategoryFiltersModal
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;

  const { assigneeIds } = useTaskFiltersForm();
  const dispatch = useTaskFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace categoryIds: remove old ones and add the new values
    newSearchParams.delete("categoryIds");
    assigneeIds.forEach((id) => newSearchParams.append("categoryIds", id));

    // Reset pagination
    newSearchParams.delete("page");

    // Clear the selected tasks in list / grid
    clearSelectedTasks?.();

    // Start the page transition and update the URL with new search params
    startFilteringTransition(() => {
      router.replace(`${pathname}?${newSearchParams}`, { locale });
    });
  };

  return (
    <FormBase id="task-category-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <TaskCategoryCheckboxGroup
          disableExpansion
          items={categoryCheckboxGroupItems}
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
