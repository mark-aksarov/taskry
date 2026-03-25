"use client";

import { useTranslations } from "next-intl";
import { useCreatePositionModal } from "./CreatePositionModal";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function PositionsEmptySectionCreateButton() {
  const t = useTranslations("positions.PositionsEmptySectionCreateButton");

  const { onOpenChange: onModalOpenChange } = useCreatePositionModal();

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("label")}
    </EmptySectionButton>
  );
}
