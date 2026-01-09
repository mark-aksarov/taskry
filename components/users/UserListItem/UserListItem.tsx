"use client";

import {
  useUserSelection,
  useSyncSelectionUserItem,
} from "@/lib/hooks/useUserSelection";

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
import { useTranslations } from "next-intl";
import { Checkbox, Link } from "@/components/ui";
import { UserDetailModal } from "../UserDetailModal";
import { UnknownUser } from "@/components/common/UnknownUser";
import { UserDetailBottomSheet } from "../UserDetailBottomSheet";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserItemActionMenuTrigger } from "../UserItemActionMenuTrigger";
import { ActionFn, ActionState, DeleteUsersPayload } from "@/lib/actions/types";

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
  deleteAction: ActionFn<ActionState, DeleteUsersPayload>;
}

export function UserListItem({
  id,
  fullName,
  imageUrl,
  email,
  phoneNumber,
  publicLink,
  position,
  deleteAction,
}: UserListItemProps) {
  const t = useTranslations("users.UserListItem");

  const { isSelected, toggleItem } = useUserSelection();
  useSyncSelectionUserItem(id, fullName);

  const userImg = imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image fill src={imageUrl} alt={fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <ListItem>
      <Checkbox
        aria-label={t("checkboxAriaLabel")}
        isSelected={isSelected(id)}
        onChange={() => toggleItem(id)}
      />

      <>
        <ItemBaseDetailModalTrigger
          modal={<UserDetailModal userId={id} />}
          className="h-9 w-9"
        >
          {userImg}
        </ItemBaseDetailModalTrigger>

        <ItemBaseDetailBottomSheetTrigger
          renderBottomSheet={(state) => (
            <UserDetailBottomSheet userId={id} state={state} />
          )}
          className="h-9 w-9"
        >
          {userImg}
        </ItemBaseDetailBottomSheetTrigger>
      </>

      <ListItemInfo>
        <ListItemTitle>
          <ItemBaseDetailModalTrigger
            modal={<UserDetailModal userId={id} />}
            className="truncate"
          >
            {fullName}
          </ItemBaseDetailModalTrigger>

          <ItemBaseDetailBottomSheetTrigger
            renderBottomSheet={(state) => (
              <UserDetailBottomSheet userId={id} state={state} />
            )}
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

      <UserItemActionMenuTrigger
        userId={id}
        userFullName={fullName}
        deleteAction={deleteAction}
      />
    </ListItem>
  );
}
