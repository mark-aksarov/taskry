"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";

import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";

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
  menuTrigger: React.ReactNode;
  userDetailModal: React.ReactNode;
  userDetailBottomSheet: React.ReactNode;
}

export function UserListItem({
  id,
  fullName,
  imageUrl,
  email,
  phoneNumber,
  publicLink,
  position,
  menuTrigger,
  userDetailModal,
  userDetailBottomSheet,
}: UserListItemProps) {
  const t = useTranslations("users.UserListItem");

  const userImg = imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image fill src={imageUrl} alt={fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <ListItem data-test="user-list-item">
      <>
        <ItemBaseDetailModalTrigger modal={userDetailModal} className="h-9 w-9">
          {userImg}
        </ItemBaseDetailModalTrigger>

        <ItemBaseDetailBottomSheetTrigger
          bottomSheet={userDetailBottomSheet}
          className="h-9 w-9"
        >
          {userImg}
        </ItemBaseDetailBottomSheetTrigger>
      </>

      <ListItemInfo>
        <ListItemTitle>
          <ItemBaseDetailModalTrigger
            modal={userDetailModal}
            className="truncate"
          >
            {fullName}
          </ItemBaseDetailModalTrigger>

          <ItemBaseDetailBottomSheetTrigger
            bottomSheet={userDetailBottomSheet}
            className="truncate"
          >
            {fullName}
          </ItemBaseDetailBottomSheetTrigger>
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
          {position ? position.name : t("unknownPosition")}
        </ListItemTitle>

        <ListItemText>{t("position")}</ListItemText>
      </ListItemInfo>

      {menuTrigger}
    </ListItem>
  );
}
