"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { UserFiltersFormPositionCheckboxGroup } from "../UserFiltersForm";
import { useFiltersFormHandleSubmit } from "@/components/common/FiltersForm";

interface UserPositionFiltersFormProps {
  positionCheckboxGroupItems: { id: number; name: string }[];
}

export function UserPositionFiltersForm({
  positionCheckboxGroupItems,
}: UserPositionFiltersFormProps) {
  const handleSubmit = useFiltersFormHandleSubmit({});

  return (
    <FormBase id="user-position-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <UserFiltersFormPositionCheckboxGroup
          items={positionCheckboxGroupItems}
          disableExpansion
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
