"use client";

import { useTranslations } from "next-intl";
import { DetailHeader } from "@/components/common/DetailHeader";

export interface CustomerDetailHeaderLayoutProps {
  fullName: string;
  imageSlot: React.ReactNode;
  companyName?: string;
}

export function CustomerDetailHeaderLayout({
  fullName,
  imageSlot,
  companyName,
}: CustomerDetailHeaderLayoutProps) {
  const t = useTranslations("customers.CustomerDetail");

  return (
    <DetailHeader
      title={fullName}
      imageSlot={imageSlot}
      subtitle={companyName ? companyName : t("noCompany")}
    />
  );
}
