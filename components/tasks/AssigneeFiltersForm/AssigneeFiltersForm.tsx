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
import { AssigneeCheckboxGroup } from "../AssigneeCheckboxGroup";
import { OverlayTriggerStateContext } from "react-aria-components";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface AssigneeFiltersFormProps {
  assigneeCheckboxGroupItems: { id: string; fullName: string }[];
}

export function AssigneeFiltersForm({
  assigneeCheckboxGroupItems,
}: AssigneeFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startFilteringTransition } = usePageTransition();
  const { clear: clearSelectedTasks } = useSelectedTasks();

  // AssigneeFiltersForm can only be used inside the AssigneeFiltersModal
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;

  const { assigneeIds } = useTaskFiltersForm();
  const dispatch = useTaskFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace assigneeIds: remove old ones and add the new values
    newSearchParams.delete("assigneeIds");
    assigneeIds.forEach((id) => newSearchParams.append("assigneeIds", id));

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
    <FormBase id="assignee-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <AssigneeCheckboxGroup
          disableExpansion
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
