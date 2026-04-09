import {
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";
import { UserDetailLayout } from "./UserDetailLayout";
import { useFormatter, useTranslations } from "next-intl";

export interface UserDetailProps {
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

export function UserDetail({
  fullName,
  bio,
  email,
  phoneNumber,
  address,
  publicLink,
  birthdate,
  position,
}: UserDetailProps) {
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
    <UserDetailLayout
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
      positionSlot={
        <DetailInfo>
          <DetailTitle>{t("position")}</DetailTitle>
          <DetailText>{position?.name || t("noPosition")}</DetailText>
        </DetailInfo>
      }
      emailSlot={
        <DetailInfo>
          <DetailTitle>{t("email")}</DetailTitle>
          <DetailText>{email}</DetailText>
        </DetailInfo>
      }
      phoneNumberSlot={
        <DetailInfo>
          <DetailTitle>{t("phoneNumber")}</DetailTitle>
          {phoneNumber ? (
            <DetailText>{phoneNumber}</DetailText>
          ) : (
            <DetailText>{t("noPhoneNumber")}</DetailText>
          )}
        </DetailInfo>
      }
      addressSlot={
        <DetailInfo>
          <DetailTitle>{t("address")}</DetailTitle>
          <DetailText>{address || t("noAddress")}</DetailText>
        </DetailInfo>
      }
      publicLinkSlot={
        <DetailInfo>
          <DetailTitle>{t("publicLink")}</DetailTitle>
          {publicLink ? (
            <DetailText>{publicLink}</DetailText>
          ) : (
            <DetailText>{t("noPublicLink")}</DetailText>
          )}
        </DetailInfo>
      }
      birthdateSlot={
        <DetailInfo className="border-none pb-0">
          <DetailTitle>{t("birthdate")}</DetailTitle>
          <DetailText>{formattedBirthdate}</DetailText>
        </DetailInfo>
      }
    />
  );
}
