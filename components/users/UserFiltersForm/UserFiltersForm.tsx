"use client";

import { RACForm } from "@/components/ui";
import { TextField } from "@/components/ui";

interface UserFiltersFormProps {
  positionCheckboxGroup: React.ReactNode;
}

export function UserFiltersForm({
  positionCheckboxGroup,
}: UserFiltersFormProps) {
  return (
    <RACForm>
      <div className="flex flex-col gap-4">
        <TextField label="Name" placeholder="Name" />
        {positionCheckboxGroup}
      </div>
    </RACForm>
  );
}
