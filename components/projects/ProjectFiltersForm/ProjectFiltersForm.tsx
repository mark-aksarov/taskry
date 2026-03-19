"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import {
  useProjectFiltersForm,
  useProjectFiltersFormDispatch,
} from "./ProjectFiltersFormContext";

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/Separator";
import { ProjectStatus } from "@/generated/prisma/enums";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { OverlayTriggerStateContext } from "react-aria-components";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { ProjectStatusCheckboxGroup } from "../ProjectStatusCheckboxGroup";
import { ProjectCreatorCheckboxGroup } from "../ProjectCreatorCheckboxGroup";
import { NoActiveTasksSwitch } from "@/components/tasks/NoActiveTasksSwitch";
import { usePageTransition } from "@/components/common/PageTransitionContext";
import { DeadlineToDatePicker } from "@/components/common/DeadlineToDatePicker";
import { CustomerCheckboxGroup } from "@/components/customer/CustomerCheckboxGroup";
import { DeadlineFromDatePicker } from "@/components/common/DeadlineFromDatePicker";
import { ProjectCategoryCheckboxGroup } from "@/components/projectCategory/ProjectCategoryCheckboxGroup";

interface ProjectFiltersFormProps {
  categoryCheckboxGroupItems: { id: number; name: string }[];
  userCheckboxGroupItems: { id: string; fullName: string }[];
  customerCheckboxGroupItems: { id: number; fullName: string }[];
}

export function ProjectFiltersForm({
  categoryCheckboxGroupItems,
  userCheckboxGroupItems,
  customerCheckboxGroupItems,
}: ProjectFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startFilteringTransition } = usePageTransition();
  const { clear: clearSelectedItems } = useSelectedProjects();

  // TaskFiltersForm can only be used inside the TaskFiltersModal
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;

  const {
    noActiveTasks,
    deadlineFrom,
    deadlineTo,
    customerIds,
    categoryIds,
    creatorIds,
    statuses,
  } = useProjectFiltersForm();

  const dispatch = useProjectFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Remove old filter values before applying new ones
    newSearchParams.delete("noActiveTasks");
    newSearchParams.delete("deadlineFrom");
    newSearchParams.delete("deadlineTo");
    newSearchParams.delete("projectIds");
    newSearchParams.delete("categoryIds");
    newSearchParams.delete("assigneeIds");
    newSearchParams.delete("statuses");

    // Add new filter values
    if (noActiveTasks) {
      newSearchParams.set("noActiveTasks", "true");
    }
    if (deadlineFrom) {
      // toString convert date to ISO 8601, e.g. '2022-02-03'
      newSearchParams.set("deadlineFrom", deadlineFrom.toString());
    }
    if (deadlineTo) {
      newSearchParams.set("deadlineTo", deadlineTo.toString());
    }
    statuses.forEach((status) => newSearchParams.append("statuses", status));
    customerIds.forEach((id) => newSearchParams.append("customerIds", id));
    categoryIds.forEach((id) => newSearchParams.append("categoryIds", id));
    creatorIds.forEach((id) => newSearchParams.append("creatorIds", id));

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
    <FormBase id="project-filters-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <NoActiveTasksSwitch
          isSelected={noActiveTasks}
          onChange={(value) =>
            dispatch({ type: "changeNoActiveTasks", payload: value })
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
          deadlineFromValue={deadlineFrom}
          value={deadlineTo}
          onChange={(value) =>
            dispatch({ type: "changeDeadlineTo", payload: value })
          }
        />
        <Separator />

        <ProjectStatusCheckboxGroup
          value={statuses}
          onChange={(value) =>
            dispatch({ type: "setStatuses", payload: value as ProjectStatus[] })
          }
        />
        <Separator />

        <ProjectCategoryCheckboxGroup
          items={categoryCheckboxGroupItems}
          value={categoryIds}
          onChange={(value) =>
            dispatch({ type: "setCategoryIds", payload: value })
          }
        />
        <Separator />

        <CustomerCheckboxGroup
          items={customerCheckboxGroupItems}
          value={customerIds}
          onChange={(value) =>
            dispatch({ type: "setCustomerIds", payload: value })
          }
        />
        <Separator />

        <ProjectCreatorCheckboxGroup
          items={userCheckboxGroupItems}
          value={creatorIds}
          onChange={(value) =>
            dispatch({ type: "setCreatorIds", payload: value })
          }
        />
      </FormBaseBody>

      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
