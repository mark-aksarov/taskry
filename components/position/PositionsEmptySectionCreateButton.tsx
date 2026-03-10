"use client";

import { useTranslations } from "next-intl";
import { useCreatePosition } from "./CreatePositionContext";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function PositionsEmptySectionCreateButton() {
  const t = useTranslations("positions.PositionsEmptySectionCreateButton");

  const { onModalOpenChange } = useCreatePosition();

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("label")}
    </EmptySectionButton>
  );
}
