"use client";

import { RACForm, TextField } from "@/components/ui";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";
import { AttachmentsField } from "@/components/common/AttachmentsField/AttachmentsField";
import { useTranslations } from "next-intl";

export function NewProjectForm({
  projectStatusSelect,
  projectCategorySelect,
}: {
  projectStatusSelect: React.ReactNode;
  projectCategorySelect: React.ReactNode;
}) {
  const t = useTranslations("projects.NewProjectForm");

  return (
    <RACForm>
      <div className="flex flex-col gap-4">
        <TextField
          label={t("NewProjectFormTitleTextField.label")}
          placeholder={t("NewProjectFormTitleTextField.placeholder")}
        />
        <TextField
          multiline
          label={t("NewProjectFormDescriptionTextField.label")}
          placeholder={t("NewProjectFormDescriptionTextField.placeholder")}
          inputClassName="h-[9rem]"
        />
        <ResponsiveDatePicker
          label={t("NewProjectFormDeadlineDatePicker.label")}
          overlayClassName="w-[var(--trigger-width)]"
        />
        {projectStatusSelect}
        {projectCategorySelect}
        <AttachmentsField />
      </div>
    </RACForm>
  );
}
