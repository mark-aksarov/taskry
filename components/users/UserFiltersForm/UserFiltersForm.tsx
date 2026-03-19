"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import {
  useUserFiltersForm,
  useUserFiltersFormDispatch,
} from "./UserFiltersFormContext";

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/Separator";
import { usePathname, useRouter } from "@/i18n/navigation";
import { PositionCheckboxGroup } from "../PositionCheckboxGroup";
import { OverlayTriggerStateContext } from "react-aria-components";
import { ActiveTasksSwitch } from "@/components/tasks/ActiveTasksSwitch";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { OverdueTasksSwitch } from "@/components/tasks/OverdueTasksSwitch";
import { NoActiveTasksSwitch } from "@/components/tasks/NoActiveTasksSwitch";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface Props {
  positionCheckboxGroupItems: { id: number; name: string }[];
}

export function UserFiltersForm({ positionCheckboxGroupItems }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startFilteringTransition } = usePageTransition();

  // UserFiltersForm can only be used inside the UserFiltersModal
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;

  const { hasActiveTasks, hasNoActiveTasks, hasOverdueTasks, positionIds } =
    useUserFiltersForm();

  const dispatch = useUserFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

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

    // Reset pagination
    newSearchParams.delete("page");

    // Start the page transition and update the URL with new search params
    startFilteringTransition(() => {
      router.replace(`${pathname}?${newSearchParams}`, { locale });
    });
  };

  return (
    <FormBase id="user-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
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
        <Separator />

        <PositionCheckboxGroup
          items={positionCheckboxGroupItems}
          value={positionIds}
          onChange={(value) =>
            dispatch({ type: "setPositionIds", payload: value })
          }
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
