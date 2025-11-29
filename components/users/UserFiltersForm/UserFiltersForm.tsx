"use client";

import { Switch } from "@/components/ui/Switch";
import { Divider, RACForm } from "@/components/ui";
import { UserFiltersFormRoleCheckboxGroup } from "./UserFiltersFormRoleCheckboxGroup";
import { useTranslations } from "next-intl";

interface UserFiltersFormProps {
  positionCheckboxGroup: React.ReactNode;
}

export function UserFiltersForm({
  positionCheckboxGroup,
}: UserFiltersFormProps) {
  const t = useTranslations("users.UserFiltersForm");

  return (
    <RACForm>
      <div className="flex flex-col gap-4">
        <Switch className="justify-between">{t("hasNoActiveTasks")}</Switch>
        <Divider />

        <Switch className="justify-between">{t("hasActiveTasks")}</Switch>
        <Divider />

        <Switch className="justify-between">{t("hasOverdueTasks")}</Switch>
        <Divider />

        <UserFiltersFormRoleCheckboxGroup />
        <Divider />

        {positionCheckboxGroup}
      </div>
    </RACForm>
  );
}
