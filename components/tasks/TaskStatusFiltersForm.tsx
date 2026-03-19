"use client";

import {
  useTaskFiltersForm,
  useTaskFiltersFormDispatch,
} from "./TaskFiltersForm";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { TaskStatus } from "@/generated/prisma/enums";
import { useSelectedTasks } from "./SelectedTasksContext";
import { usePathname, useRouter } from "@/i18n/navigation";
import { OverlayTriggerStateContext } from "react-aria-components";
import { TaskStatusCheckboxGroup } from "./TaskStatusCheckboxGroup";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function TaskStatusFiltersForm() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startFilteringTransition } = usePageTransition();
  const { clear: clearSelectedTasks } = useSelectedTasks();

  // TaskStatusFiltersForm can only be used inside the TaskStatusFiltersModal
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;

  const { statuses } = useTaskFiltersForm();
  const dispatch = useTaskFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace status: remove old ones and add the new values
    newSearchParams.delete("status");
    statuses.forEach((status) => newSearchParams.append("status", status));

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
    <FormBase id="task-status-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <TaskStatusCheckboxGroup
          value={statuses}
          onChange={(value) =>
            dispatch({ type: "setStatuses", payload: value as TaskStatus[] })
          }
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
