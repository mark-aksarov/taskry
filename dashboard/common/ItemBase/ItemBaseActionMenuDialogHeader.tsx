import { useTranslations } from "next-intl";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

export function ItemBaseActionMenuDialogHeader() {
  const t = useTranslations("dashboard.common.ItemBaseActionMenuDialogHeader");

  return <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>;
}
