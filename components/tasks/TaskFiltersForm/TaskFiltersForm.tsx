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

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/Separator";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSelectedTasks } from "../SelectedTasksContext";
import { useTaskFiltersDispatch } from "../TaskFiltersContext";
import { OverlayTriggerStateContext } from "react-aria-components";
import { areSearchParamsEqual } from "@/lib/utils/areSearchParamsEqual";
import { usePageTransition } from "@/components/common/PageTransitionContext";
import { TaskFiltersFormOnlyMyTaskSwitch } from "./TaskFiltersFormOnlyMyTaskSwitch";
import { FiltersFormResetButton } from "@/components/common/FiltersFormResetButton";
import { FiltersFormSubmitButton } from "@/components/common/FiltersFormSubmitButton";
import { TaskFiltersFormDeadlineToDatePicker } from "./TaskFiltersFormDeadlineToDatePicker";
import { TaskFiltersFormDeadlineFromDatePicker } from "./TaskFiltersFormDeadlineFromDatePicker";

interface TaskFiltersFormProps {
  statusCheckboxGroup: React.ReactNode;
  categoryCheckboxGroup: React.ReactNode;
  projectCheckboxGroup: React.ReactNode;
  assigneeCheckboxGroup: React.ReactNode;
}

export function TaskFiltersForm({
  statusCheckboxGroup,
  categoryCheckboxGroup,
  projectCheckboxGroup,
  assigneeCheckboxGroup,
}: TaskFiltersFormProps) {
  const overlayContext = useContext(OverlayTriggerStateContext);

  if (!overlayContext) {
    throw new Error(
      "FiltersFormResetButton must be used within a FormBaseModal",
    );
  }

  const { clear: clearSelectedTasks } = useSelectedTasks();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startFilteringTransition } = usePageTransition();
  const dispatch = useTaskFiltersDispatch();

  const { close: closeModal } = overlayContext;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    const formData = new FormData(e.currentTarget);

    // transform "on" to "true" and remove unchecked checkboxes from formData
    normalizeBooleanFields(formData, ["onlyMyTasks"]);

    // convert formData to URLSearchParams and remove empty values
    const newSearchParams = formDataToSearchParams(formData);

    // preserve the "sort" param when resetting filters
    const sort = searchParams.get("sort");
    if (sort) newSearchParams.set("sort", sort);

    // reset pagination when applying new filters
    newSearchParams.delete("page");

    // if the new searchParams are the same as the current searchParams, do nothing
    if (
      areSearchParamsEqual({
        a: searchParams,
        b: newSearchParams,
        excludeKeys: ["page", "sort", "pageSize"],
      })
    ) {
      return;
    }
    clearSelectedTasks();

    // start the page transition and update the URL with the new searchParams
    startFilteringTransition(() => {
      router.replace(`${pathname}?${newSearchParams.toString()}`, {
        locale,
      });
    });
  };

  return (
    <FormBase id="task-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <TaskFiltersFormOnlyMyTaskSwitch />

        <Separator />

        <TaskFiltersFormDeadlineFromDatePicker />
        <TaskFiltersFormDeadlineToDatePicker />

        <Separator />

        <div>{statusCheckboxGroup}</div>
        <Separator />
        <div>{categoryCheckboxGroup}</div>
        <Separator />
        <div>{projectCheckboxGroup}</div>
        <Separator />
        <div>{assigneeCheckboxGroup}</div>
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
        <FiltersFormResetButton
          onPress={() => dispatch({ type: "resetFilters" })}
        />
      </FormBaseFooter>
    </FormBase>
  );
}
