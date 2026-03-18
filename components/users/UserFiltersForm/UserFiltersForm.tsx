"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import {
  FiltersFormSubmitButton,
  useFiltersFormHandleSubmit,
} from "@/components/common/FiltersForm";

import { Separator } from "@/components/ui/Separator";
import { UserFiltersFormActiveTasksSwitch } from "./UserFiltersFormActiveTasksSwitch";
import { UserFiltersFormOverdueTasksSwitch } from "./UserFiltersFormOverdueTasksSwitch";
import { UserFiltersFormNoActiveTasksSwitch } from "./UserFiltersFormNoActiveTasksSwitch";
import { UserFiltersFormPositionCheckboxGroup } from "./UserFiltersFormPositionCheckboxGroup";

interface UserFiltersFormProps {
  positionCheckboxGroupItems: { id: number; name: string }[];
}

export function UserFiltersForm({
  positionCheckboxGroupItems,
}: UserFiltersFormProps) {
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

        <UserFiltersFormPositionCheckboxGroup
          items={positionCheckboxGroupItems}
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
