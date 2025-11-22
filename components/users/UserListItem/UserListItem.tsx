"use client";

import Image from "next/image";
import { Item } from "react-stately";
import { Pencil, Trash } from "lucide-react";
import { Checkbox, Link } from "@/components/ui";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import {
  ItemBaseActionMenuTrigger,
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";
import { UserDetailModal } from "../UserDetailModal";
import { UnknownUser } from "@/components/common/UnknownUser";
import { UserDetailBottomSheet } from "../UserDetailBottomSheet";
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
  showCheckbox?: boolean;
}

export function UserListItem({
  id,
  fullName,
  imageUrl,
  email,
  phoneNumber,
  publicLink,
  position,
  showCheckbox,
}: UserListItemProps) {
  const userImg = imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image fill src={imageUrl} alt={fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <ListItem>
      {showCheckbox && <Checkbox aria-label="user checkbox" />}

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
            "Phone number is not provided"
          )}
        </ListItemTitle>

        <ListItemText>Phone number</ListItemText>
      </ListItemInfo>

      <ListItemInfo className="@max-2xl:hidden">
        <ListItemTitle>
          {publicLink ? (
            <Link href={publicLink}>{publicLink}</Link>
          ) : (
            "Link is not provided"
          )}
        </ListItemTitle>

        <ListItemText>Public link</ListItemText>
      </ListItemInfo>

      <ListItemInfo className="@max-4xl:hidden">
        <ListItemTitle>
          {position ? position.name : "Unknown position"}
        </ListItemTitle>

        <ListItemText>Position</ListItemText>
      </ListItemInfo>

      <ItemBaseActionMenuTrigger>
        <Item textValue="Edit" key="edit">
          <Pencil size={16} /> Edit
        </Item>
        <Item textValue="Delete" key="delete">
          <Trash size={16} /> Delete
        </Item>
      </ItemBaseActionMenuTrigger>
    </ListItem>
  );
}
