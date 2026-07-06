"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../../common/ModalManagerContext";
import { FallbackSectionButton } from "@/common/FallbackSection";

export function PositionsEmptySectionCreateButton() {
  const t = useTranslations(
    "dashboard.positions.PositionsEmptySectionCreateButton",
  );

  const { onOpenChange: onModalOpenChange } = useModal("createPosition");

  return (
    <FallbackSectionButton
      data-test="positions-empty-section-create-button"
      onPress={() => onModalOpenChange(true)}
    >
      {t("label")}
    </FallbackSectionButton>
  );
}
