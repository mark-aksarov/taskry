import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui";

export function NewSubtaskDialogHeader() {
  const t = useTranslations("subtasks.NewSubtaskDialogHeader");

  return <DialogHeader className="px-4! py-3!">{t("heading")}</DialogHeader>;
}
