import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";

import { useTranslations } from "next-intl";
import { CustomerDetailAltLayout } from "./CustomerDetailAltLayout";

export interface CustomerDetailAltProps {
  fullName: string;
  bio?: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  company?: {
    name: string;
  };
}

export function CustomerDetailAlt({
  bio,
  fullName,
  email,
  phoneNumber,
  publicLink,
  company,
}: CustomerDetailAltProps) {
  const t = useTranslations("customers.CustomerDetail");

  return (
    <CustomerDetailAltLayout
      bioSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("bio")}</DetailTitle>}
          text={<DetailText>{bio || t("noBio")}</DetailText>}
          editButton={<DetailEditButton />}
        />
      }
      fullNameSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("fullName")}</DetailTitle>}
          text={<DetailText>{fullName || t("noFullName")}</DetailText>}
          editButton={<DetailEditButton />}
        />
      }
      emailSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("email")}</DetailTitle>}
          text={<DetailText>{email}</DetailText>}
          editButton={<DetailEditButton />}
        />
      }
      phoneNumberSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("phoneNumber")}</DetailTitle>}
          text={
            phoneNumber ? (
              <DetailText>{phoneNumber}</DetailText>
            ) : (
              <DetailText>{t("noPhoneNumber")}</DetailText>
            )
          }
          editButton={<DetailEditButton />}
        />
      }
      companySlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("company")}</DetailTitle>}
          text={<DetailText>{company?.name || t("noCompany")}</DetailText>}
          editButton={<DetailEditButton />}
        />
      }
      publicLinkSlot={
        <DetailInfoAlt
          className="border-none pb-0"
          title={<DetailTitle>{t("publicLink")}</DetailTitle>}
          text={
            publicLink ? (
              <DetailText>{publicLink}</DetailText>
            ) : (
              <DetailText>{t("noPublicLink")}</DetailText>
            )
          }
          editButton={<DetailEditButton />}
        />
      }
    />
  );
}
