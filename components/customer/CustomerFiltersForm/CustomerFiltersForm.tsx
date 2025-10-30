"use client";

import { RACForm } from "@/components/ui";
import { TextField } from "@/components/ui";

interface UserFiltersFormProps {
  companyCheckboxGroup: React.ReactNode;
}

export function CustomerFiltersForm({
  companyCheckboxGroup,
}: UserFiltersFormProps) {
  return (
    <RACForm>
      <div className="flex flex-col gap-4">
        <TextField label="Name" placeholder="Name" />
        {companyCheckboxGroup}
      </div>
    </RACForm>
  );
}
