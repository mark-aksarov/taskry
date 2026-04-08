"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../common/ModalManagerContext";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function PositionsEmptySectionCreateButton() {
  const t = useTranslations("positions.PositionsEmptySectionCreateButton");

  const { onOpenChange: onModalOpenChange } = useModal("createPosition");

  return (
    <EmptySectionButton
      data-test="positions-empty-section-create-button"
      onPress={() => onModalOpenChange(true)}
    >
      {t("label")}
    </EmptySectionButton>
  );
}
