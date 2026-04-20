"use client";

import {
  useProjectFiltersForm,
  useProjectFiltersFormDispatch,
} from "./ProjectFiltersFormContext";

import { useSearchParams } from "next/navigation";
import { Separator } from "@/ui/Separator";
import { FormBase } from "@/dashboard/common/FormBase";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { ProjectStatusCheckboxGroup } from "../ProjectStatusCheckboxGroup";
import { ProjectCreatorCheckboxGroup } from "../ProjectCreatorCheckboxGroup";
import { NoActiveTasksSwitch } from "@/dashboard/tasks/NoActiveTasksSwitch";
import { DeadlineToDatePicker } from "@/dashboard/common/DeadlineToDatePicker";
import { CustomerCheckboxGroup } from "@/dashboard/customer/CustomerCheckboxGroup";
import { DeadlineFromDatePicker } from "@/dashboard/common/DeadlineFromDatePicker";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";
import { ProjectCategoryCheckboxGroup } from "@/dashboard/projectCategory/ProjectCategoryCheckboxGroup";

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
  const searchParams = useSearchParams();
  const applyFilterURL = useApplyFilterURL();
  const { clear: clearSelectedItems } = useSelectedProjects();
  const runSubmitSideEffects = useFilterSubmitSideEffects({
    clearSelectedItems,
  });

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

    // Run submit UI side effects
    runSubmitSideEffects();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Remove old filter values before applying new ones
    newSearchParams.delete("noActiveTasks");
    newSearchParams.delete("deadlineFrom");
    newSearchParams.delete("deadlineTo");
    newSearchParams.delete("statuses");
    newSearchParams.delete("customerIds");
    newSearchParams.delete("categoryIds");
    newSearchParams.delete("creatorIds");

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

    applyFilterURL(newSearchParams);
  };

  return (
    <FormBase id="project-filters-form" onSubmit={handleSubmit}>
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
    </FormBase>
  );
}
