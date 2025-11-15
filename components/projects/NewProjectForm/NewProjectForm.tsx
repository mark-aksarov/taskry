"use client";

import { RACForm, TextField } from "@/components/ui";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";
import { AttachmentsField } from "@/components/common/AttachmentsField/AttachmentsField";

export function NewProjectForm({
  projectStatusSelect,
  projectCategorySelect,
}: {
  projectStatusSelect: React.ReactNode;
  projectCategorySelect: React.ReactNode;
}) {
  return (
    <RACForm>
      <div className="flex flex-col gap-4">
        <TextField label="Title" placeholder="Typing title" />
        <TextField
          multiline
          label="Description"
          placeholder="Typing description"
          inputClassName="h-[9rem]"
        />
        <ResponsiveDatePicker
          label="Deadline"
          overlayClassName="w-[var(--trigger-width)]"
        />
        {projectStatusSelect}
        {projectCategorySelect}
        <AttachmentsField />
      </div>
    </RACForm>
  );
}
