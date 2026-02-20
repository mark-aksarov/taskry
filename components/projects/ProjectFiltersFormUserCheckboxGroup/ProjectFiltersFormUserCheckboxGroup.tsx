"use client";

import { useTranslations } from "next-intl";
import { ProjectFilters } from "@/lib/types";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useExpandedItems } from "@/lib/hooks/useExpandedItems";
import { ExpandCollapseButton } from "@/components/common/ExpandCollapseButton";

export function ProjectFiltersFormUserCheckboxGroup({
  filters,
  users,
}: {
  filters?: ProjectFilters;
  users: { id: string; fullName: string }[];
}) {
  const t = useTranslations("projects.ProjectFiltersFormUserCheckboxGroup");
  const defaultValue = filters?.user?.map((id) => id.toString());
  const { isExpanded, setIsExpanded, expandedItems } = useExpandedItems(users);

  return (
    <>
      <CheckboxGroup name="user" label={t("label")} defaultValue={defaultValue}>
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
