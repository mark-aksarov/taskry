"use client";

import {
  FilterCheckboxGroupExpandButton,
  FilterCheckboxGroupWrapper,
  useFilterCheckboxGroupExpansion,
} from "@/components/common/FilterCheckboxGroup";

import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useProjectCheckboxGroup } from "./ProjectCheckboxGroupContext";

interface Item {
  id: number;
  title: string;
}

interface Props {
  items: Item[];
  disableExpansion?: boolean;
}

export function ProjectCheckboxGroup({ items, disableExpansion }: Props) {
  const t = useTranslations("projects.ProjectCheckboxGroup");

  const { value, updateValue } = useProjectCheckboxGroup();

  const {
    isExpanded,
    setIsExpanded,
    visibleItems,
    hiddenItems,
    hiddenSelectedItems,
  } = useFilterCheckboxGroupExpansion(
    items,
    value,
    disableExpansion ? Number.MAX_VALUE : undefined,
  );

  const renderCheckbox = (item: Item, hidden = false) => (
    <Checkbox
      key={item.id}
      value={item.id.toString()}
      className={twMerge("font-normal capitalize", hidden && "hidden")}
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
        onChange={updateValue}
      >
        {visibleItems.map((item) => renderCheckbox(item))}
        {hiddenItems.map((item) => renderCheckbox(item, true))}
      </CheckboxGroup>

      <FilterCheckboxGroupExpandButton
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        hiddenSelectedItemNames={hiddenSelectedItems.map((item) => item.title)}
      />
    </FilterCheckboxGroupWrapper>
  );
}
