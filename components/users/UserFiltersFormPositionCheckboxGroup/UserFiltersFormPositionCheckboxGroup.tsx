"use client";

import { UserFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useExpandedItems } from "@/lib/hooks/useExpandedItems";
import { ExpandCollapseButton } from "@/components/common/ExpandCollapseButton";

interface UserFiltersFormPositionCheckboxGroupProps {
  filters?: UserFilters;
  positions: { id: number; name: string }[];
}

export function UserFiltersFormPositionCheckboxGroup({
  filters,
  positions,
}: UserFiltersFormPositionCheckboxGroupProps) {
  const t = useTranslations("users.UserFiltersFormPositionCheckboxGroup");
  const defaultValue = filters?.position?.map((id) => id.toString());
  const { isExpanded, setIsExpanded, expandedItems } =
    useExpandedItems(positions);

  return (
    <>
      <CheckboxGroup
        name="position"
        label={t("label")}
        defaultValue={defaultValue}
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
