import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { UserDetailAltLayout } from "./UserDetailAltLayout";
import { useFormatter, useTranslations } from "next-intl";

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

  const format = useFormatter();

  const formattedBirthdate = birthdate
    ? format.dateTime(new Date(birthdate), {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : t("noBirthdate");

  return (
    <UserDetailAltLayout
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
      birthdateSlot={
        <DetailInfoAlt
          className="border-none pb-0"
          title={<DetailTitle>{t("birthdate")}</DetailTitle>}
          text={<DetailText>{formattedBirthdate}</DetailText>}
          editButton={<DetailEditButton />}
        />
      }
    />
  );
}
