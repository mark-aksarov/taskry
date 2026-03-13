"use client";

import { useTranslations } from "next-intl";
import { DetailHeader } from "@/components/common/DetailHeader";

interface CustomerDetailHeaderProps {
  fullName: string;
  imageSlot: React.ReactNode;
  companyName?: string;
}

export function CustomerDetailHeader({
  fullName,
  imageSlot,
  companyName,
}: CustomerDetailHeaderProps) {
  const t = useTranslations("customers.CustomerDetail");

  return (
    <DetailHeader
      title={fullName}
      imageSlot={imageSlot}
      subtitle={companyName ? companyName : t("noCompany")}
    />
  );
}
