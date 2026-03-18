"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { UserFiltersFormPositionCheckboxGroup } from "../UserFiltersForm";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { useFiltersFormHandleSubmit } from "@/components/common/FiltersForm";

interface UserPositionFiltersFormProps {
  positionCheckboxGroupItems: { id: number; name: string }[];
}

export function UserPositionFiltersForm({
  positionCheckboxGroupItems,
}: UserPositionFiltersFormProps) {
  const { clear: clearSelectedItems } = useSelectedItems();

  const handleSubmit = useFiltersFormHandleSubmit({
    clearSelectedItems,
  });

  return (
    <FormBase id="user-position-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
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
