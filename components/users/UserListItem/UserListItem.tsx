"use client";

import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { Item } from "react-stately";

import { Checkbox, Link } from "@/components/ui";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { ImageContainer } from "@/components/common/ImageContainer";
import { ItemBaseActionMenuTrigger } from "@/components/common/ItemBase";

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
  return (
    <ListItem>
      {showCheckbox && <Checkbox aria-label="user checkbox" />}

      {imageUrl ? (
        <Link href={`/users/${id}`}>
          <ImageContainer className="h-9 w-9">
            <Image fill src={imageUrl} alt={fullName} />
          </ImageContainer>
        </Link>
      ) : (
        <ImageContainer className="h-9 w-9" />
      )}

      <ListItemInfo>
        <ListItemTitle>
          <Link href={`/users/${id}`}>{fullName}</Link>
        </ListItemTitle>

        <ListItemText>
          <Link href={`mailto:${email}`}>{email}</Link>
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
