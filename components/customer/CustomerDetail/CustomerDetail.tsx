import {
  DetailInfo,
  DetailLink,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";

import { useTranslations } from "next-intl";
import { CustomerDetailLayout } from "./CustomerDetailLayout";

export interface CustomerDetailProps {
  fullName: string;
  bio?: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  company?: {
    name: string;
  };
}

export function CustomerDetail({
  bio,
  fullName,
  email,
  phoneNumber,
  publicLink,
  company,
}: CustomerDetailProps) {
  const t = useTranslations("customers.CustomerDetail");

  return (
    <CustomerDetailLayout
      bioSlot={
        <DetailInfo>
          <DetailTitle>{t("bio")}</DetailTitle>
          <DetailText>{bio || t("noBio")}</DetailText>
        </DetailInfo>
      }
      fullNameSlot={
        <DetailInfo>
          <DetailTitle>{t("fullName")}</DetailTitle>
          <DetailText>{fullName || t("noFullName")}</DetailText>
        </DetailInfo>
      }
      emailSlot={
        <DetailInfo>
          <DetailTitle>{t("email")}</DetailTitle>
          <DetailLink href={`mailto:${email}`}>
            <DetailText>{email}</DetailText>
          </DetailLink>
        </DetailInfo>
      }
      phoneNumberSlot={
        <DetailInfo>
          <DetailTitle>{t("phoneNumber")}</DetailTitle>
          {phoneNumber ? (
            <DetailLink href={`tel:${phoneNumber}`}>
              <DetailText>{phoneNumber}</DetailText>
            </DetailLink>
          ) : (
            <DetailText>{t("noPhoneNumber")}</DetailText>
          )}
        </DetailInfo>
      }
      companySlot={
        <DetailInfo>
          <DetailTitle>{t("company")}</DetailTitle>
          <DetailText>{company?.name || t("noCompany")}</DetailText>
        </DetailInfo>
      }
      publicLinkSlot={
        <DetailInfo className="border-none pb-0">
          <DetailTitle>{t("publicLink")}</DetailTitle>
          {publicLink ? (
            <DetailLink href={publicLink}>
              <DetailText>{publicLink}</DetailText>
            </DetailLink>
          ) : (
            <DetailText>{t("noPublicLink")}</DetailText>
          )}
        </DetailInfo>
      }
    />
  );
}
