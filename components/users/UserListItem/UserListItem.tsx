"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { ItemBaseDetailModalTrigger } from "@/components/common/ItemBase";

import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { useTranslations } from "next-intl";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserItemActionMenuTrigger } from "../UserItemActionMenuTrigger";
import { UserDetailModal } from "../UserDetailModal";

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
      <Image fill src={imageUrl} alt={fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  const userDetailModal = (
    <UserDetailModal userId={id} userDetailContainer={userDetailContainer} />
  );

  return (
    <ListItem data-test="user-list-item" data-id={id}>
      <>
        <ItemBaseDetailModalTrigger
          modal={userDetailModal}
          className="h-9 w-9 max-md:hidden"
        >
          {userImg}
        </ItemBaseDetailModalTrigger>

        <Link className="md:hidden" href={`/team/${id}`}>
          {userImg}
        </Link>
      </>

      <ListItemInfo>
        <ListItemTitle>
          <ItemBaseDetailModalTrigger
            modal={userDetailModal}
            className="truncate max-md:hidden"
          >
            {fullName}
          </ItemBaseDetailModalTrigger>

          <Link className="block truncate md:hidden" href={`/team/${id}`}>
            {fullName}
          </Link>
        </ListItemTitle>

        <ListItemText>
          <Link className="block truncate" href={`mailto:${email}`}>
            {email}
          </Link>
        </ListItemText>
      </ListItemInfo>

      <ListItemInfo className="@max-lg:hidden">
        <ListItemTitle>
          {phoneNumber ? (
            <Link href={`tel:${phoneNumber}`}>{phoneNumber}</Link>
          ) : (
            t("noPhoneNumber")
          )}
        </ListItemTitle>

        <ListItemText>{t("phoneNumber")}</ListItemText>
      </ListItemInfo>

      <ListItemInfo className="@max-2xl:hidden">
        <ListItemTitle>
          {publicLink ? (
            <Link href={publicLink}>{publicLink}</Link>
          ) : (
            t("noPublicLink")
          )}
        </ListItemTitle>

        <ListItemText>{t("publicLink")}</ListItemText>
      </ListItemInfo>

      <ListItemInfo className="@max-4xl:hidden">
        <ListItemTitle>
          {position ? position.name : t("noPosition")}
        </ListItemTitle>

        <ListItemText>{t("position")}</ListItemText>
      </ListItemInfo>

      {showUserActionMenuTrigger && (
        <UserItemActionMenuTrigger
          showDeleteMenuItem={showDeleteMenuItem}
          guestMode={guestMode}
          editUserFormContainer={editUserFormContainer}
          userId={id}
          userFullName={fullName}
        />
      )}
    </ListItem>
  );
}
