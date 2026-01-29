import {
  SubtaskFormDialog,
  SubtaskFormDialogBody,
  SubtaskFormDialogFooter,
  SubtaskFormDialogHeader,
  SubtaskFormDialogSubmitButton,
} from "./SubtaskFormDialog";

import { useTranslations } from "next-intl";

export function NewSubtaskFormDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("subtasks.NewSubtaskFormDialog");

  return (
    <SubtaskFormDialog>
      <SubtaskFormDialogHeader>{t("heading")}</SubtaskFormDialogHeader>
      <SubtaskFormDialogBody>{children}</SubtaskFormDialogBody>
      <SubtaskFormDialogFooter>
        <SubtaskFormDialogSubmitButton
          form="new-subtask-form"
          label={t("submitButtonLabel")}
        />
      </SubtaskFormDialogFooter>
    </SubtaskFormDialog>
  );
}
