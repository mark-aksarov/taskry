"use client";

import {
  ListItemText,
  ListItemTitle,
  ListItemTextLink,
  ListItemTitleDetailModalTrigger,
} from "@/components/common/List";

import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { useTranslations } from "next-intl";
import { UserDetailModal } from "../UserDetailModal";
import { UserListItemLayout } from "./UserListItemLayout";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserItemActionMenuTrigger } from "../UserItemActionMenuTrigger";
import { ItemBaseDetailModalTrigger } from "@/components/common/ItemBase";
import { ListItemTitleLink } from "@/components/common/List/ListItemTitle";

export interface UserListItemProps {
  id: string;
  fullName: string;
  imageUrl?: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  position?: {
    name: string;
  };
  guestMode: boolean;
  showUserActionMenuTrigger: boolean;
  showDeleteMenuItem: boolean;
  editUserFormContainer: React.ReactNode;
  userDetailContainer: React.ReactNode;
}

export function UserListItem({
  id,
  fullName,
  imageUrl,
  email,
  phoneNumber,
  publicLink,
  position,
  guestMode,
  showUserActionMenuTrigger,
  showDeleteMenuItem,
  editUserFormContainer,
  userDetailContainer,
}: UserListItemProps) {
  const t = useTranslations("users.UserListItem");

  const userImg = imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image src={imageUrl} alt={fullName} width={36} height={36} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  const userDetailModal = (
    <UserDetailModal userId={id} userDetailContainer={userDetailContainer} />
  );

  return (
    <UserListItemLayout
      id={id}
      imgSlot={
        <ItemBaseDetailModalTrigger
          modal={userDetailModal}
          className="h-9 w-9 max-md:hidden"
        >
          {userImg}
        </ItemBaseDetailModalTrigger>
      }
      imgMobileSlot={
        <Link className="md:hidden" href={`/team/${id}`}>
          {userImg}
        </Link>
      }
      mainSlot={
        <>
          <ListItemTitleDetailModalTrigger modal={userDetailModal}>
            {fullName}
          </ListItemTitleDetailModalTrigger>

          <ListItemTextLink href={`mailto:${email}`}>{email}</ListItemTextLink>
        </>
      }
      mainMobileSlot={
        <>
          <ListItemTitle>{fullName}</ListItemTitle>
          <ListItemText>{email}</ListItemText>
        </>
      }
      phoneNumberSlot={
        <>
          {phoneNumber ? (
            <ListItemTitleLink href={`tel:${phoneNumber}`}>
              {phoneNumber}
            </ListItemTitleLink>
          ) : (
            <ListItemTitle>{t("noPhoneNumber")}</ListItemTitle>
          )}

          <ListItemText>{t("phoneNumber")}</ListItemText>
        </>
      }
      publicLinkSlot={
        <>
          {publicLink ? (
            <ListItemTitleLink href={publicLink}>
              {publicLink}
            </ListItemTitleLink>
          ) : (
            <ListItemTitle>{t("noPublicLink")}</ListItemTitle>
          )}

          <ListItemText>{t("publicLink")}</ListItemText>
        </>
      }
      positionSlot={
        <>
          <ListItemTitle>
            {position ? position.name : t("noPosition")}
          </ListItemTitle>

          <ListItemText>{t("position")}</ListItemText>
        </>
      }
      menuTriggerSlot={
        showUserActionMenuTrigger && (
          <UserItemActionMenuTrigger
            showDeleteMenuItem={showDeleteMenuItem}
            guestMode={guestMode}
            editUserFormContainer={editUserFormContainer}
            userId={id}
            userFullName={fullName}
          />
        )
      }
    />
  );
}
