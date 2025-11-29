"use client";

import { RACForm, TextField } from "@/components/ui";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";
import { AttachmentsField } from "@/components/common/AttachmentsField/AttachmentsField";
import { useTranslations } from "next-intl";

export function TaskFormBase({
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
  const t = useTranslations("tasks.TaskFormBase");

  return (
    <RACForm>
      <div className="flex flex-col gap-4">
        <TextField
          label={t("TaskFormBaseTitleTextField.label")}
          placeholder={t("TaskFormBaseTitleTextField.placeholder")}
        />
        <TextField
          multiline
          label={t("TaskFormBaseDescriptionTextField.label")}
          placeholder={t("TaskFormBaseDescriptionTextField.placeholder")}
          inputClassName="h-[9rem]"
        />
        <ResponsiveDatePicker
          label={t("TaskFormBaseDeadlineDatePicker.label")}
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
