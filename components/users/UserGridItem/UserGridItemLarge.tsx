"use client";

import {
  BaseUserItemProps,
  UserItemPendingOverlay,
  UserItemActionMenuTrigger,
} from "../UserItem";

import {
  GridItemInfo,
  GridItemText,
  GridItemEmail,
  GridItemPublicLink,
  GridItemContactList,
  GridItemPhoneNumber,
  GridItemTitleButton,
} from "@/components/common/Grid";

import {
  ItemBaseDetailButton,
  ItemBaseUserImageContainer,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/Separator";
import { UserGridItemLayout } from "./UserGridItemLayout";
import { useModal } from "@/components/common/ModalManagerContext";
import { useCurrentUser } from "@/components/common/CurrentUserContext";

export function UserGridItemLarge(props: BaseUserItemProps) {
  return (
    <UserItemPendingOverlay>
      <UserGridItemLargeInner {...props} />
    </UserItemPendingOverlay>
  );
}

const UserGridItemLargeInner = memo(function UserGridItemLargeInner({
  id,
  fullName,
  imageUrl,
  position,
  phoneNumber,
  publicLink,
  email,
}: BaseUserItemProps) {
  const t = useTranslations("users.UserGridItem");
  const { isOwner, isGuest } = useCurrentUser();
  const { onOpenChange: onUserDetailModalOpenChange } = useModal("userDetail");

  const userImg = (
    <ItemBaseUserImageContainer
      user={{ fullName, imageUrl }}
      width={36}
      height={36}
      className="h-9 w-9"
    />
  );

  // We show the action menu only for owners and guests
  const showActionMenuTrigger = isOwner || isGuest;

  return (
    <UserGridItemLayout
      actionMenuSlot={
        showActionMenuTrigger ? (
          <UserItemActionMenuTrigger userId={id} className="-mr-2" />
        ) : undefined
      }
      imageSlot={
        <ItemBaseDetailButton
          aria-label={fullName}
          onPress={() => onUserDetailModalOpenChange(true)}
        >
          {userImg}
        </ItemBaseDetailButton>
      }
      titleSlot={
        <GridItemInfo className="flex-auto">
          <GridItemTitleButton
            onPress={() => onUserDetailModalOpenChange(true)}
          >
            {fullName}
          </GridItemTitleButton>

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
});
