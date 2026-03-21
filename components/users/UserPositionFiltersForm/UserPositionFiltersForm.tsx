"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import {
  useUserFiltersForm,
  useUserFiltersFormDispatch,
} from "../UserFiltersForm/UserFiltersFormContext";

import { useSearchParams } from "next/navigation";
import { PositionCheckboxGroup } from "../PositionCheckboxGroup";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";

interface UserPositionFiltersFormProps {
  positionCheckboxGroupItems: { id: number; name: string }[];
}

export function UserPositionFiltersForm({
  positionCheckboxGroupItems,
}: UserPositionFiltersFormProps) {
  const searchParams = useSearchParams();
  const applyFilterURL = useApplyFilterURL();
  const runSubmitSideEffects = useFilterSubmitSideEffects();

  const { positionIds } = useUserFiltersForm();
  const dispatch = useUserFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run submit UI side effects
    runSubmitSideEffects();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace positionIds: remove old ones and add the new values
    newSearchParams.delete("positionIds");
    positionIds.forEach((id) => newSearchParams.append("positionIds", id));

    applyFilterURL(newSearchParams);
  };

  return (
    <FormBase id="user-position-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <PositionCheckboxGroup
          items={positionCheckboxGroupItems}
          disableExpansion
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
