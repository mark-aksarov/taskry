import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";

export function NewSubtaskDialogAddButton() {
  const t = useTranslations("subtasks.NewSubtaskDialog");

  return (
    <Button
      variant="primary"
      size="medium"
      label={t("addButtonLabel")}
      className="w-full justify-center p-3"
    />
  );
}
