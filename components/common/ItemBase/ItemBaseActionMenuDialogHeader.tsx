import {
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { useTranslations } from "next-intl";

export function ItemBaseActionMenuDialogHeader() {
  const t = useTranslations("common.ItemBase.ItemBaseActionMenuTrigger");

  return (
    <DialogHeader>
      <DialogHeading>{t("heading")}</DialogHeading>
      <DialogCloseButton />
    </DialogHeader>
  );
}
