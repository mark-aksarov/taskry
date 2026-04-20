"use client";

import {
  useTaskFiltersForm,
  useTaskFiltersFormDispatch,
} from "../TaskFiltersForm";

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { FormBase } from "@/dashboard/common/FormBase";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSelectedTasks } from "../SelectedTasksContext";
import { OverlayTriggerStateContext } from "react-aria-components";
import { usePageTransition } from "@/dashboard/common/PageTransitionContext";
import { ProjectCheckboxGroup } from "@/dashboard/projects/ProjectCheckboxGroup";

interface TaskProjectFiltersFormProps {
  projectCheckboxGroupItems: { id: number; title: string }[];
}

export function TaskProjectFiltersForm({
  projectCheckboxGroupItems,
}: TaskProjectFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startFilteringTransition } = usePageTransition();
  const { clear: clearSelectedTasks } = useSelectedTasks();

  // TaskProjectFiltersForm can only be used inside the TaskProjectFiltersModal
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;

  const { projectIds } = useTaskFiltersForm();
  const dispatch = useTaskFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace projectIds: remove old ones and add the new values
    newSearchParams.delete("categoryIds");
    projectIds.forEach((id) => newSearchParams.append("projectIds", id));

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
    <FormBase id="task-project-filters-form" onSubmit={handleSubmit}>
      <ProjectCheckboxGroup
        disableExpansion
        items={projectCheckboxGroupItems}
        value={projectIds}
        onChange={(ids) => dispatch({ type: "setProjectIds", payload: ids })}
      />
    </FormBase>
  );
}
