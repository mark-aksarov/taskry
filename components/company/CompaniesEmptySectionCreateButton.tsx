"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../common/ModalManagerContext";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function CompaniesEmptySectionCreateButton() {
  const t = useTranslations("company.CompaniesEmptySectionCreateButton");

  const { onOpenChange: onModalOpenChange } = useModal("createCompany");

  return (
    <EmptySectionButton
      data-test="companies-empty-section-create-button"
      onPress={() => onModalOpenChange(true)}
    >
      {t("label")}
    </EmptySectionButton>
  );
}
