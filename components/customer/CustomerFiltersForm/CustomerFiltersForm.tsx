"use client";

import { RACForm } from "@/components/ui";
import { Button, TextField } from "@/components/ui";

interface UserFiltersFormProps {
  companyCheckboxGroup: React.ReactNode;
}

export function CustomerFiltersForm({
  companyCheckboxGroup,
}: UserFiltersFormProps) {
  return (
    <RACForm className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <TextField label="Name" placeholder="Name" />
        {companyCheckboxGroup}
      </div>
      <Button
        variant="primary"
        size="medium"
        label="Apply Filters"
        className="justify-center"
      />
    </RACForm>
  );
}
