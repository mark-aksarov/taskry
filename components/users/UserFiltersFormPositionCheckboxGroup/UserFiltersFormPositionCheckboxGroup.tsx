"use client";

import { useUserFilters, useUserFiltersDispatch } from "../UserFiltersContext";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useExpandedItems } from "@/lib/hooks/useExpandedItems";
import { ExpandCollapseButton } from "@/components/common/ExpandCollapseButton";

interface UserFiltersFormPositionCheckboxGroupProps {
  positions: { id: number; name: string }[];
}

export function UserFiltersFormPositionCheckboxGroup({
  positions,
}: UserFiltersFormPositionCheckboxGroupProps) {
  const t = useTranslations("users.UserFiltersFormPositionCheckboxGroup");
  const { isExpanded, setIsExpanded, expandedItems } =
    useExpandedItems(positions);
  const filters = useUserFilters();
  const dispatch = useUserFiltersDispatch();

  return (
    <>
      <CheckboxGroup
        name="position"
        label={t("label")}
        value={filters.position}
        onChange={(value) =>
          dispatch({ type: "setPosition", payload: value as any })
        }
      >
        {expandedItems.map((item) => (
          <Checkbox
            key={item.id}
            value={item.id.toString()}
            className="font-normal capitalize"
          >
            {item.name}
          </Checkbox>
        ))}
      </CheckboxGroup>

      <ExpandCollapseButton
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    </>
  );
}
