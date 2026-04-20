"use client";

import {
  BaseUserItemProps,
  useUserItemPending,
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
} from "@/dashboard/common/GridItem";

import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { Link } from "@/ui/Link";
import { useTranslations } from "next-intl";
import { Separator } from "@/ui/Separator";
import { UserGridItemLayout } from "./UserGridItemLayout";
import { UserGridItemMobileSkeleton } from "./UserGridItemSkeleton";
import { useCurrentUser } from "@/dashboard/common/CurrentUserContext";
import { ItemBaseUserImageContainer } from "@/dashboard/common/ItemBase";
import { GridItemMobileGate } from "@/dashboard/common/GridItemMobileGate";

export function UserGridItemMobile(props: BaseUserItemProps) {
  const isPending = useUserItemPending();
  return (
    <GridItemMobileGate skeleton={<UserGridItemMobileSkeleton />}>
      <UserGridItemMobileInner {...props} isPending={isPending} />
    </GridItemMobileGate>
  );
}

type InnerProps = BaseUserItemProps & {
  isPending: boolean;
};

export const UserGridItemMobileInner = memo(function UserGridItemMobileInner({
  id,
  isPending,
  fullName,
  imageUrl,
  position,
  phoneNumber,
  publicLink,
  email,
}: InnerProps) {
  const t = useTranslations("dashboard.users.UserGridItem");

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
    <div
      className={twMerge("relative block", isPending && "pointer-events-none")}
    >
      <Link
        aria-label={fullName}
        href={`/team/${id}`}
        className="absolute inset-0 z-0"
      />
      <UserGridItemLayout
        className={isPending ? "*:opacity-50" : undefined}
        actionMenuSlot={
          showActionMenuTrigger ? (
            <UserItemActionMenuTrigger
              userId={id}
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
    </div>
  );
});
