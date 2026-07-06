"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../../common/ModalManagerContext";
import { FallbackSectionButton } from "@/common/FallbackSection";

export function CompaniesEmptySectionCreateButton() {
  const t = useTranslations(
    "dashboard.company.CompaniesEmptySectionCreateButton",
  );

  const { onOpenChange: onModalOpenChange } = useModal("createCompany");

  return (
    <FallbackSectionButton
      data-test="companies-empty-section-create-button"
      onPress={() => onModalOpenChange(true)}
    >
      {t("label")}
    </FallbackSectionButton>
  );
}
