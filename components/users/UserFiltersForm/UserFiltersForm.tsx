"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import {
  FiltersFormResetButton,
  FiltersFormSubmitButton,
  useFiltersFormHandleSubmit,
} from "@/components/common/FiltersForm";

import { Separator } from "@/components/ui/Separator";
import { useUserFiltersDispatch } from "../UserFiltersContext";
import { UserFiltersFormActiveTasksSwitch } from "./UserFiltersFormActiveTasksSwitch";
import { UserFiltersFormOverdueTasksSwitch } from "./UserFiltersFormOverdueTasksSwitch";
import { UserFiltersFormNoActiveTasksSwitch } from "./UserFiltersFormNoActiveTasksSwitch";

interface UserFiltersFormProps {
  positionCheckboxGroup: React.ReactNode;
}

export function UserFiltersForm({
  positionCheckboxGroup,
}: UserFiltersFormProps) {
  const dispatch = useUserFiltersDispatch();

  const handleSubmit = useFiltersFormHandleSubmit({
    booleanFieldNames: [
      "hasActiveProjects",
      "hasOverdueProjects",
      "hasNoActiveProjects",
    ],
  });

  return (
    <FormBase id="user-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <UserFiltersFormNoActiveTasksSwitch />
        <Separator />

        <UserFiltersFormActiveTasksSwitch />
        <Separator />

        <UserFiltersFormOverdueTasksSwitch />
        <Separator />

        <div>{positionCheckboxGroup}</div>
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
