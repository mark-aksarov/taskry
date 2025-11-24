"use client";

import { Divider, RACForm } from "@/components/ui";
import { Switch } from "@/components/ui/Switch";

interface CustomerFiltersFormProps {
  companyCheckboxGroup: React.ReactNode;
}

export function CustomerFiltersForm({
  companyCheckboxGroup,
}: CustomerFiltersFormProps) {
  return (
    <RACForm>
      <div className="flex flex-col gap-4">
        <Switch className="justify-between">Has no active projects</Switch>
        <Divider />

        <Switch className="justify-between">Has active projects</Switch>
        <Divider />

        <Switch className="justify-between">Has overdue projects</Switch>
        <Divider />

        {companyCheckboxGroup}
      </div>
    </RACForm>
  );
}
