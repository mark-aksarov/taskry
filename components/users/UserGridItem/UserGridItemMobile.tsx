"use client";

import {
  BaseUserItemProps,
  UserItemProviders,
  UserItemActionMenuTrigger,
} from "../UserItem";

import {
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemEmail,
  GridItemPublicLink,
  GridItemContactList,
  GridItemPhoneNumber,
} from "@/components/common/Grid";

import { memo } from "react";
import { Link } from "@/components/ui/Link";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/Separator";
import { UserGridItemLayout } from "./UserGridItemLayout";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { ItemBaseUserImageContainer } from "@/components/common/ItemBase";

export function UserGridItemMobile(props: BaseUserItemProps) {
  return (
    <UserItemProviders>
      <div className="relative block">
        <Link href={`/team/${props.id}`} className="absolute inset-0 z-0" />
        <UserGridItemMobileInner {...props} />
      </div>
    </UserItemProviders>
  );
}

export const UserGridItemMobileInner = memo(
  ({
    id,
    fullName,
    imageUrl,
    position,
    phoneNumber,
    publicLink,
    email,
    updateUserFormContainer,
  }: BaseUserItemProps) => {
    const t = useTranslations("users.UserGridItem");

    const { isOwner, isGuest } = useCurrentUser();

    const userImg = (
      <ItemBaseUserImageContainer
        user={{ fullName, imageUrl }}
        width={44}
        height={44}
        className="pointer-events-none h-11 w-11"
      />
    );

    // We show the action menu only for owners and guests
    const showActionMenuTrigger = isOwner || isGuest;

    return (
      <UserGridItemLayout
        actionMenuSlot={
          showActionMenuTrigger ? (
            <UserItemActionMenuTrigger
              updateUserFormContainer={updateUserFormContainer}
              userId={id}
              userFullName={fullName}
              className="relative z-1 -mr-2"
            />
          ) : undefined
        }
        imageSlot={userImg}
        titleSlot={
          <GridItemInfo className="flex-auto">
            <GridItemTitle>{fullName}</GridItemTitle>
            <GridItemText>
              {position ? position.name : t("noPosition")}
            </GridItemText>
          </GridItemInfo>
        }
        phoneNumberSlot={
          <>
            <Separator />
            <GridItemContactList>
              <GridItemPhoneNumber phoneNumber={phoneNumber} />
              <GridItemPublicLink publicLink={publicLink} />
              <GridItemEmail email={email} />
            </GridItemContactList>
          </>
        }
      />
    );
  },
);
