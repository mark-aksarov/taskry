"use client";

import { useTranslations } from "next-intl";
import { ProjectFilters } from "@/lib/types";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export function ProjectFiltersFormUserCheckboxGroup({
  filters,
  users,
}: {
  filters: ProjectFilters;
  users: { id: string; fullName: string }[];
}) {
  const t = useTranslations("projects.ProjectFiltersFormUserCheckboxGroup");

  return (
    <CheckboxGroup
      name="user"
      label={t("label")}
      defaultValue={filters.user?.map((id) => id.toString())}
    >
      {users.map((user) => (
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
  );
}
