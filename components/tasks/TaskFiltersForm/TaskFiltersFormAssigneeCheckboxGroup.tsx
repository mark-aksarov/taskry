"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Checkbox, CheckboxGroup } from "@/components/ui";

export function TaskFiltersFormAssigneeCheckboxGroup({
  users,
}: {
  users: { id: string; fullName: string }[];
}) {
  const searchParams = useSearchParams();
  const t = useTranslations(
    "tasks.TaskFiltersForm.TaskFiltersFormAssigneeCheckboxGroup",
  );
  const initialValues = searchParams.get("assignee")?.split(",") || [];

  return (
    <CheckboxGroup
      label={t("label")}
      name="assignee"
      defaultValue={initialValues}
    >
      {users.map((user) => (
        <Checkbox
          data-test={`assignee-${user.id}-checkbox`}
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
