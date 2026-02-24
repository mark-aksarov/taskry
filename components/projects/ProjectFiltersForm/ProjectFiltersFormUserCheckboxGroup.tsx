"use client";

import {
  useProjectFilters,
  useProjectFiltersDispatch,
} from "../ProjectFiltersContext";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useExpandedItems } from "@/lib/hooks/useExpandedItems";
import { ExpandCollapseButton } from "@/components/common/ExpandCollapseButton";

export function ProjectFiltersFormUserCheckboxGroup({
  items,
}: {
  items: { id: string; fullName: string }[];
}) {
  const t = useTranslations("projects.ProjectFiltersFormUserCheckboxGroup");
  const { isExpanded, setIsExpanded, expandedItems } = useExpandedItems(items);
  const filters = useProjectFilters();
  const dispatch = useProjectFiltersDispatch();

  return (
    <>
      <CheckboxGroup
        name="user"
        label={t("label")}
        value={filters.user}
        onChange={(value) =>
          dispatch({ type: "setUser", payload: value as any })
        }
      >
        {expandedItems.map((user) => (
          <Checkbox
            data-test={`user-${user.id}-checkbox`}
            key={user.id}
            value={user.id.toString()}
            className="font-normal capitalize"
          >
            {user.fullName}
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
