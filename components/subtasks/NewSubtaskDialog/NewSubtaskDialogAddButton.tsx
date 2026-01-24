import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function NewSubtaskDialogAddButton() {
  const t = useTranslations("subtasks.NewSubtaskDialogAddButton");

  return (
    <Button
      variant="primary"
      size="medium"
      label={t("label")}
      className="w-full justify-center p-3"
    />
  );
}
