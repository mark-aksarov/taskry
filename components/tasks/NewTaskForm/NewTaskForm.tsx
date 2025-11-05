"use client";

import { RACForm, TextField } from "@/components/ui";
import { TaskStatusSelect } from "../TaskStatusSelect";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";
import { AttachmentsField } from "@/components/common/AttachmentsField/AttachmentsField";

export function NewTaskForm({
  taskCategorySelect,
  projectSelect,
  assigneeSelect,
}: {
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
        <TaskStatusSelect />
        {taskCategorySelect}
        {projectSelect}
        {assigneeSelect}
        <AttachmentsField />
      </div>
    </RACForm>
  );
}
