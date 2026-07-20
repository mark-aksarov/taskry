import { useTranslations } from "next-intl";
import { ConfirmModalText } from "@/common/ConfirmModal";

export function ImportModalText() {
  const t = useTranslations("dashboard.common.ImportModalText");

  return <ConfirmModalText>{t("text")}</ConfirmModalText>;
}
