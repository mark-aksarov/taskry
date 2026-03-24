"use client";

import { useTranslations } from "next-intl";
import { useCreateCompanyModal } from "./CreateCompanyModal";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function CompaniesEmptySectionCreateButton() {
  const t = useTranslations("company.CompaniesEmptySectionCreateButton");

  const { onOpenChange: onModalOpenChange } = useCreateCompanyModal();

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("label")}
    </EmptySectionButton>
  );
}
