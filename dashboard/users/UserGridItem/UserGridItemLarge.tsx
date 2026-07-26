"use client";

import {
  BaseUserItemProps,
  useUserItemPending,
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
} from "@/dashboard/common/GridItem";

import {
  ItemBaseDetailButton,
  ItemBaseUserImageContainer,
} from "@/dashboard/common/ItemBase";

import { memo } from "react";
import { Separator } from "@/ui/Separator";
import { useTranslations } from "next-intl";
import { useRole } from "@/common/RoleContext";
import { useModal } from "@/common/ModalManagerContext";
import { UserGridItemLayout } from "./UserGridItemLayout";
import { UserGridItemLargeSkeleton } from "./UserGridItemSkeleton";
import { GridItemLargeGate } from "@/dashboard/common/GridItemLargeGate";

export function UserGridItemLarge(props: BaseUserItemProps) {
  const isPending = useUserItemPending();

  return (
    <GridItemLargeGate skeleton={<UserGridItemLargeSkeleton />}>
      <UserGridItemLargeInner {...props} isPending={isPending} />
    </GridItemLargeGate>
  );
}

type InnerProps = BaseUserItemProps & {
  isPending: boolean;
};

const UserGridItemLargeInner = memo(function UserGridItemLargeInner({
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
  const role = useRole();
  const { onOpenChange: onUserDetailModalOpenChange } = useModal("userDetail");

  const userImg = (
    <ItemBaseUserImageContainer
      user={{ fullName, imageUrl }}
      width={36}
      height={36}
      className="h-9 w-9"
    />
  );

  // We show the action menu only for owners
  const showActionMenuTrigger = role === "owner";

  return (
    <UserGridItemLayout
      className={isPending ? "pointer-events-none *:opacity-50" : undefined}
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
