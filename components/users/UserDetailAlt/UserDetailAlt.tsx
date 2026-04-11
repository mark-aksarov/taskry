import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { UserDetailAltLayout } from "./UserDetailAltLayout";
import { UserBioDetailInfoAlt } from "./UserBioDetailInfoAlt";
import { UserAddressDetailInfoAlt } from "./UserAddressDetailInfoAlt";
import { UserFullNameDetailInfoAlt } from "./UserFullNameDetailInfoAlt";
import { UserBirthdateDetailInfoAlt } from "./UserBirthdateDetailInfoAlt";
import { UserPhoneNumberDetailInfoAlt } from "./UserPhoneNumberDetailInfoAlt";

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
      addressSlot={<UserAddressDetailInfoAlt address={address} />}
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
