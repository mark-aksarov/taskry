"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../common/ModalManagerContext";
import { EmptySectionButton } from "@/dashboard/common/EmptySection";

export function PositionsEmptySectionCreateButton() {
  const t = useTranslations(
    "dashboard.positions.PositionsEmptySectionCreateButton",
  );

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
