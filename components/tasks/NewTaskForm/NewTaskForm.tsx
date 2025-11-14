"use client";

import { RACForm, TextField } from "@/components/ui";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";
import { AttachmentsField } from "@/components/common/AttachmentsField/AttachmentsField";

export function NewTaskForm({
  taskStatusSelect,
  taskCategorySelect,
  projectSelect,
  assigneeSelect,
}: {
  taskStatusSelect: React.ReactNode;
  taskCategorySelect: React.ReactNode;
  projectSelect: React.ReactNode;
  assigneeSelect: React.ReactNode;
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
        {taskStatusSelect}
        {taskCategorySelect}
        {projectSelect}
        {assigneeSelect}
        <AttachmentsField />
      </div>
    </RACForm>
  );
}
