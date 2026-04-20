import { useTranslations } from "next-intl";
import { DialogHeaderWithClose } from "../DialogHeaderWithClose";

export function ItemBaseActionMenuDialogHeader() {
  const t = useTranslations("dashboard.common.ItemBaseActionMenuDialogHeader");

  return <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>;
}
