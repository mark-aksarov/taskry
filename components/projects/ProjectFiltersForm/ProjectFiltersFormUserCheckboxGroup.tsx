"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export function ProjectFiltersFormUserCheckboxGroup({
  users,
}: {
  users: { id: string; fullName: string }[];
}) {
  const t = useTranslations("projects.ProjectFiltersFormUserCheckboxGroup");

  const searchParams = useSearchParams();
  const initialValues = searchParams.get("user")?.split(",") || [];

  return (
    <CheckboxGroup name="user" label={t("label")} defaultValue={initialValues}>
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
