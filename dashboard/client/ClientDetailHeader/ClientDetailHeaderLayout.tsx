"use client";

import { useTranslations } from "next-intl";
import { DetailHeader } from "@/dashboard/common/DetailHeader";

export interface ClientDetailHeaderLayoutProps {
  fullName: string;
  imageSlot: React.ReactNode;
  companyName?: string;
}

export function ClientDetailHeaderLayout({
  fullName,
  imageSlot,
  companyName,
}: ClientDetailHeaderLayoutProps) {
  const t = useTranslations("dashboard.clients.ClientDetail");

  return (
    <DetailHeader
      title={fullName}
      imageSlot={imageSlot}
      subtitle={companyName ? companyName : t("noCompany")}
    />
  );
}
