"use client";

import { useTranslations } from "next-intl";
import { CustomerImageModal } from "./CustomerImageModal";
import { DetailHeader } from "@/components/common/DetailHeader";
import { CustomerImageMenuTrigger } from "./CustomerImageMenuTrigger";
import { DeleteCustomerImageModal } from "./DeleteCustomerImageModal";
import { PersonDetailHeaderImage } from "../common/PersonDetailHeaderImage";

interface CustomerDetailHeaderProps {
  customerId: number;
  fullName: string;
  imageUrl?: string;
  companyName?: string;
  canUpdateImage: boolean;
}

export function CustomerDetailHeader({
  customerId,
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

            <CustomerImageModal customerId={customerId} />

            <DeleteCustomerImageModal
              customerId={customerId}
              customerFullName={fullName}
            />
          </>
        ) : (
          <PersonDetailHeaderImage alt={fullName} imageUrl={imageUrl} />
        )
      }
      subtitle={companyName ? companyName : t("noCompany")}
    />
  );
}
