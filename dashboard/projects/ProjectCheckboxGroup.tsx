"use client";

import {
  FilterCheckboxGroupWrapper,
  FilterCheckboxGroupExpandButton,
  useFilterCheckboxGroupExpansion,
} from "@/dashboard/common/FilterCheckboxGroup";

import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/ui/Checkbox";
import { CheckboxGroup } from "@/ui/CheckboxGroup";

interface Item {
  id: number;
  title: string;
}

interface Props {
  items: Item[];
  disableExpansion?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
}

export function ProjectCheckboxGroup({
  items,
  disableExpansion,
  value,
  onChange,
}: Props) {
  const t = useTranslations("dashboard.projects.ProjectCheckboxGroup");

  const { isExpanded, setIsExpanded, visibleItems, hiddenSelectedItems } =
    useFilterCheckboxGroupExpansion(
      items,
      value,
      disableExpansion ? Number.MAX_VALUE : undefined,
    );

  const renderCheckbox = (item: Item) => (
    <Checkbox
      key={item.id}
      value={item.id.toString()}
      className={twMerge("font-normal capitalize")}
      data-test="project-checkbox"
      data-id={item.id}
    >
      {item.title}
    </Checkbox>
  );

  return (
    <FilterCheckboxGroupWrapper>
      <CheckboxGroup
        label={t("label")}
        name="project"
        value={value}
        onChange={onChange}
      >
        {visibleItems.map((item) => renderCheckbox(item))}
      </CheckboxGroup>

      <FilterCheckboxGroupExpandButton
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        hiddenSelectedItemNames={hiddenSelectedItems.map((item) => item.title)}
      />
    </FilterCheckboxGroupWrapper>
  );
}
