"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../../common/ModalManagerContext";
import { FallbackSectionButton } from "@/common/FallbackSection";

export function ClientsEmptySectionCreateButton() {
  const t = useTranslations(
    "dashboard.clients.ClientsEmptySectionCreateButton",
  );

  const { onOpenChange: onCreateClientModalOpenChange } =
    useModal("createClient");

  return (
    <FallbackSectionButton
      data-test="clients-empty-section-create-button"
      onPress={() => onCreateClientModalOpenChange(true)}
    >
      {t("label")}
    </FallbackSectionButton>
  );
}
