"use client";

import { User } from "@/generated/prisma";
import { useTranslations } from "next-intl";
import { Checkbox, CheckboxGroup } from "@/components/ui";

export function ProjectFiltersFormUserCheckboxGroup({
  users,
}: {
  users: Pick<User, "id" | "fullName">[];
}) {
  const t = useTranslations(
    "projects.ProjectFiltersForm.ProjectFiltersFormUserCheckboxGroup",
  );

  return (
    <CheckboxGroup label={t("label")}>
      {users.map((user) => (
        <Checkbox
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
