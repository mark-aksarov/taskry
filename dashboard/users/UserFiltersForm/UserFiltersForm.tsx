"use client";

import {
  useUserFiltersForm,
  useUserFiltersFormDispatch,
} from "./UserFiltersFormContext";

import { useSearchParams } from "next/navigation";
import { Separator } from "@/ui/Separator";
import { FormBase } from "@/dashboard/common/FormBase";
import { PositionCheckboxGroup } from "../PositionCheckboxGroup";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { ActiveTasksSwitch } from "@/dashboard/tasks/ActiveTasksSwitch";
import { OverdueTasksSwitch } from "@/dashboard/tasks/OverdueTasksSwitch";
import { NoActiveTasksSwitch } from "@/dashboard/tasks/NoActiveTasksSwitch";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";

interface Props {
  positionCheckboxGroupItems: { id: number; name: string }[];
}

export function UserFiltersForm({ positionCheckboxGroupItems }: Props) {
  const searchParams = useSearchParams();
  const applyFilterURL = useApplyFilterURL();
  const runSubmitSideEffects = useFilterSubmitSideEffects();

  const { hasActiveTasks, hasNoActiveTasks, hasOverdueTasks, positionIds } =
    useUserFiltersForm();

  const dispatch = useUserFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run submit UI side effects
    runSubmitSideEffects();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Remove old filter values before applying new ones
    newSearchParams.delete("hasActiveTasks");
    newSearchParams.delete("hasNoActiveTasks");
    newSearchParams.delete("hasOverdueTasks");
    newSearchParams.delete("positionIds");

    // Add new filter values
    if (hasActiveTasks) {
      newSearchParams.set("hasActiveTasks", "true");
    }

    if (hasNoActiveTasks) {
      newSearchParams.set("hasNoActiveTasks", "true");
    }

    if (hasOverdueTasks) {
      newSearchParams.set("hasOverdueTasks", "true");
    }

    positionIds.forEach((id) => newSearchParams.append("positionIds", id));

    applyFilterURL(newSearchParams);
  };

  return (
    <FormBase id="user-filters-form" onSubmit={handleSubmit}>
      <NoActiveTasksSwitch
        isSelected={hasNoActiveTasks}
        onChange={(value) =>
          dispatch({ type: "changeHasNoActiveTasks", payload: value })
        }
      />
      <Separator />

      <ActiveTasksSwitch
        isSelected={hasActiveTasks}
        onChange={(value) =>
          dispatch({ type: "changeHasActiveTasks", payload: value })
        }
      />
      <Separator />

      <OverdueTasksSwitch
        isSelected={hasOverdueTasks}
        onChange={(value) =>
          dispatch({ type: "changeHasOverdueTasks", payload: value })
        }
      />
      {positionCheckboxGroupItems.length > 0 && (
        <>
          <Separator />

          <PositionCheckboxGroup
            items={positionCheckboxGroupItems}
            value={positionIds}
            onChange={(value) =>
              dispatch({ type: "setPositionIds", payload: value })
            }
          />
        </>
      )}
    </FormBase>
  );
}
