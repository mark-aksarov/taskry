import { useTranslations } from "next-intl";
import { ConfirmModalText } from "@/common/ConfirmModal";

export function ImportModalText() {
  const t = useTranslations("dashboard.common.ImportModalText");

  return (
    <>
      <ConfirmModalText className="mb-3">{t("text")}</ConfirmModalText>
      <ConfirmModalText className="mb-4">
        {t.rich("note", { strong: (chunks) => <strong>{chunks}</strong> })}
      </ConfirmModalText>
    </>
  );
}
