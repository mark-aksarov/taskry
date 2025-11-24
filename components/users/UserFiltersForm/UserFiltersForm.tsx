"use client";

import { Switch } from "@/components/ui/Switch";
import { Divider, RACForm } from "@/components/ui";
import { UserFiltersFormRoleCheckboxGroup } from "./UserFiltersFormRoleCheckboxGroup";

interface UserFiltersFormProps {
  positionCheckboxGroup: React.ReactNode;
}

export function UserFiltersForm({
  positionCheckboxGroup,
}: UserFiltersFormProps) {
  return (
    <RACForm>
      <div className="flex flex-col gap-4">
        <Switch className="justify-between">Has not active tasks</Switch>
        <Divider />

        <Switch className="justify-between">Has active tasks</Switch>
        <Divider />

        <Switch className="justify-between">Has overdue tasks</Switch>
        <Divider />

        <UserFiltersFormRoleCheckboxGroup />
        <Divider />

        {positionCheckboxGroup}
      </div>
    </RACForm>
  );
}
