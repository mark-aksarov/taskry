"use client";

import { RACForm, TextField } from "@/components/ui";

export function NewSubtaskForm() {
  return (
    <RACForm>
      <TextField
        inputClassName="p-3 rounded-lg"
        label="Text"
        placeholder="Typing a new subtask..."
      />
    </RACForm>
  );
}
