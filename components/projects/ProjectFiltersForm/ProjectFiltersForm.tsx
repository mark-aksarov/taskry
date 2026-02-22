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
import { useSelectedProjects } from "../SelectedProjectsContext";
import { OverlayTriggerStateContext } from "react-aria-components";
import { areSearchParamsEqual } from "@/lib/utils/areSearchParamsEqual";
import { usePageTransition } from "@/components/common/PageTransitionContext";
import { FiltersFormResetButton } from "@/components/common/FiltersFormResetButton";
import { FiltersFormSubmitButton } from "@/components/common/FiltersFormSubmitButton";
import { ProjectFiltersFormNoActiveTasksSwitch } from "./ProjectFiltersFormNoActiveTasksSwitch";
import { ProjectFiltersFormDeadlineToDatePicker } from "./ProjectFiltersFormDeadlineToDatePicker";
import { ProjectFiltersFormDeadlineFromDatePicker } from "./ProjectFiltersFormDeadlineFromDatePicker";
import { useProjectFiltersDispatch } from "../ProjectFiltersContext";

interface ProjectFiltersFormProps {
  projectStatusCheckboxGroup: React.ReactNode;
  projectCategoryCheckboxGroup: React.ReactNode;
  customerCheckboxGroup: React.ReactNode;
  userCheckboxGroup: React.ReactNode;
}

export function ProjectFiltersForm({
  projectStatusCheckboxGroup,
  projectCategoryCheckboxGroup,
  customerCheckboxGroup,
  userCheckboxGroup,
}: ProjectFiltersFormProps) {
  const overlayContext = useContext(OverlayTriggerStateContext);

  if (!overlayContext) {
    throw new Error(
      "FiltersFormResetButton must be used within a FormBaseModal",
    );
  }

  const { clear: clearSelectedProjects } = useSelectedProjects();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { startFilteringTransition } = usePageTransition();
  const searchParams = useSearchParams();
  const dispatch = useProjectFiltersDispatch();

  const { close: closeModal } = overlayContext;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    const formData = new FormData(e.currentTarget);

    // transform "on" to "true" and remove unchecked checkboxes from formData
    normalizeBooleanFields(formData, ["noActiveTasks"]);

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
    clearSelectedProjects();

    // start the page transition and update the URL with the new searchParams
    startFilteringTransition(() => {
      router.replace(`${pathname}?${newSearchParams.toString()}`, {
        locale,
      });
    });
  };

  return (
    <FormBase id="project-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectFiltersFormNoActiveTasksSwitch />

        <Separator />

        <ProjectFiltersFormDeadlineFromDatePicker />
        <ProjectFiltersFormDeadlineToDatePicker />

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
        <FiltersFormResetButton
          onPress={() => dispatch({ type: "resetFilters" })}
        />
      </FormBaseFooter>
    </FormBase>
  );
}
