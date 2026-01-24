import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";

export function ItemBaseActionMenuDialogHeader() {
  const t = useTranslations("common.ItemBaseActionMenuDialogHeader");

  return <DialogHeader>{t("heading")}</DialogHeader>;
}
