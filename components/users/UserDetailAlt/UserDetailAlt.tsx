import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { UserDetailAltLayout } from "./UserDetailAltLayout";
import { UserBioDetailInfoAlt } from "./UserBioDetailInfoAlt";
import { UserAddressDetailInfoAlt } from "./UserAddressDetailInfoAlt";
import { UserFullNameDetailInfoAlt } from "./UserFullNameDetailInfoAlt";
import { UserPositionDetailInfoAlt } from "./UserPositionDetailInfoAlt";
import { UserBirthdateDetailInfoAlt } from "./UserBirthdateDetailInfoAlt";
import { UserPublicLinkDetailInfoAlt } from "./UserPublicLinkDetailInfoAlt";
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
      positionSlot={<UserPositionDetailInfoAlt position={position} />}
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
      publicLinkSlot={<UserPublicLinkDetailInfoAlt publicLink={publicLink} />}
      birthdateSlot={<UserBirthdateDetailInfoAlt birthdate={birthdate} />}
    />
  );
}
