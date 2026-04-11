import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";

import { useTranslations } from "next-intl";
import { CustomerDetailAltLayout } from "./CustomerDetailAltLayout";
import { CustomerBioDetailInfoAlt } from "./CustomerBioDetailInfoAlt";
import { CustomerFullNameDetailInfoAlt } from "./CustomerFullNameDetailInfoAlt";
import { CustomerPhoneNumberDetailInfoAlt } from "./CustomerPhoneNumberDetailInfoAlt";

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
      bioSlot={<CustomerBioDetailInfoAlt bio={bio} />}
      fullNameSlot={<CustomerFullNameDetailInfoAlt fullName={fullName} />}
      emailSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("email")}</DetailTitle>}
          text={<DetailText>{email}</DetailText>}
          editButton={<DetailEditButton />}
        />
      }
      phoneNumberSlot={
        <CustomerPhoneNumberDetailInfoAlt phoneNumber={phoneNumber} />
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
