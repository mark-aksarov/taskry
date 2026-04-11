import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useFormatter, useTranslations } from "next-intl";
import { UserDetailAltLayout } from "./UserDetailAltLayout";
import { UserBioDetailInfoAlt } from "./UserBioDetailInfoAlt";
import { UserFullNameDetailInfoAlt } from "./UserFullNameDetailInfoAlt";
import { UserPhoneNumberDetailInfoAlt } from "./UserPhoneNumberDetailInfoAlt";
import { UserBirthdateDetailInfoAlt } from "./UserBirthdateDetailInfoAlt";

export interface UserDetailAltProps {
  id: string;
  fullName: string;
  bio?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  publicLink?: string;
  birthdate?: string;
  position?: {
    name: string;
  };
}

export function UserDetailAlt({
  fullName,
  bio,
  email,
  phoneNumber,
  address,
  publicLink,
  birthdate,
  position,
}: UserDetailAltProps) {
  const t = useTranslations("users.UserDetail");

  return (
    <UserDetailAltLayout
      bioSlot={<UserBioDetailInfoAlt bio={bio} />}
      fullNameSlot={<UserFullNameDetailInfoAlt fullName={fullName} />}
      positionSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("position")}</DetailTitle>}
          text={<DetailText>{position?.name || t("noPosition")}</DetailText>}
          editButton={<DetailEditButton />}
        />
      }
      emailSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("email")}</DetailTitle>}
          text={<DetailText>{email}</DetailText>}
        />
      }
      phoneNumberSlot={
        <UserPhoneNumberDetailInfoAlt phoneNumber={phoneNumber} />
      }
      addressSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("address")}</DetailTitle>}
          text={<DetailText>{address || t("noAddress")}</DetailText>}
          editButton={<DetailEditButton />}
        />
      }
      publicLinkSlot={
        <DetailInfoAlt
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
      birthdateSlot={<UserBirthdateDetailInfoAlt birthdate={birthdate} />}
    />
  );
}
