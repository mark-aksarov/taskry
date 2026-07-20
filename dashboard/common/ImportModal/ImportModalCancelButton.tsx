import { useTranslations } from "next-intl";
import { ConfirmModalCancelButton } from "@/common/ConfirmModal";

export function ImportModalCancelButton() {
  const t = useTranslations("dashboard.common.ImportModalCancelButton");

  return <ConfirmModalCancelButton label={t("label")} />;
}
