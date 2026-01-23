import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui";

export function ItemBaseActionMenuDialogHeader() {
  const t = useTranslations("common.ItemBase.ItemBaseActionMenuTrigger");

  return <DialogHeader>{t("heading")}</DialogHeader>;
}
