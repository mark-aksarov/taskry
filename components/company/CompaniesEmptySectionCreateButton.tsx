"use client";

import { useTranslations } from "next-intl";
import { useCreateCompany } from "./CreateCompanyContext";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function CompaniesEmptySectionCreateButton() {
  const t = useTranslations("company.CompaniesEmptySectionCreateButton");

  const { onModalOpenChange } = useCreateCompany();

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("label")}
    </EmptySectionButton>
  );
}
