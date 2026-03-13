"use client";

import { useTranslations } from "next-intl";
import { DetailHeader } from "@/components/common/DetailHeader";
import { CustomerImageMenuTrigger } from "./CustomerImageMenuTrigger";
import { PersonDetailHeaderImage } from "../common/PersonDetailHeaderImage";

interface CustomerDetailHeaderProps {
  fullName: string;
  imageUrl?: string;
  companyName?: string;
  canUpdateImage: boolean;
}

export function CustomerDetailHeader({
  fullName,
  imageUrl,
  companyName,
  canUpdateImage,
}: CustomerDetailHeaderProps) {
  const t = useTranslations("customers.CustomerDetail");

  return (
    <DetailHeader
      title={fullName}
      imageSlot={
        canUpdateImage ? (
          <>
            <CustomerImageMenuTrigger>
              <PersonDetailHeaderImage alt={fullName} imageUrl={imageUrl} />
            </CustomerImageMenuTrigger>
          </>
        ) : (
          <PersonDetailHeaderImage alt={fullName} imageUrl={imageUrl} />
        )
      }
      subtitle={companyName ? companyName : t("noCompany")}
    />
  );
}
