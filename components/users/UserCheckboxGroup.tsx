"use client";

import {
  FilterCheckboxGroupWrapper,
  useFilterCheckboxGroupExpansion,
  FilterCheckboxGroupExpandButton,
} from "@/components/common/FilterCheckboxGroup";

import { twMerge } from "tailwind-merge";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

interface Item {
  id: string;
  fullName: string;
}

export interface UserCheckboxGroupProps {
  items: Item[];
  name: string;
  label: string;
  disableExpansion?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
}

export function UserCheckboxGroup({
  items,
  name,
  label,
  disableExpansion,
  value,
  onChange,
}: UserCheckboxGroupProps) {
  const { isExpanded, setIsExpanded, visibleItems, hiddenSelectedItems } =
    useFilterCheckboxGroupExpansion(
      items,
      value,
      disableExpansion ? Number.MAX_VALUE : undefined,
    );

  const renderCheckbox = (item: Item) => (
    <Checkbox
      key={item.id}
      value={item.id}
      className={twMerge("font-normal capitalize")}
      data-test="user-checkbox"
      data-id={item.id}
    >
      {item.fullName}
    </Checkbox>
  );

  return (
    <FilterCheckboxGroupWrapper>
      <CheckboxGroup
        value={value}
        name={name}
        label={label}
        onChange={onChange}
      >
        {visibleItems.map((item) => renderCheckbox(item))}
      </CheckboxGroup>

      <FilterCheckboxGroupExpandButton
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        hiddenSelectedItemNames={hiddenSelectedItems.map(
          (item) => item.fullName,
        )}
      />
    </FilterCheckboxGroupWrapper>
  );
}
