"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";
import Image from "next/image";
import { Item } from "react-stately";
import { Pencil, Trash } from "lucide-react";
import { Checkbox, Link } from "@/components/ui";
import { ImageContainer } from "@/components/common/ImageContainer";
import { ItemBaseActionMenuTrigger } from "@/components/common/ItemBase";
import { UnknownUser } from "@/components/common/UnknownUser";

export type CustomerListItemProps = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  imageUrl?: string;
  company: {
    id: number;
    name: string;
  };
};

export function CustomerListItem({
  id,
  fullName,
  email,
  phoneNumber,
  publicLink,
  imageUrl,
  company,
}: CustomerListItemProps) {
  return (
    <ListItem>
      <Checkbox aria-label="customer checkbox" />
      {imageUrl ? (
        <Link href={`/customers/${id}`}>
          <ImageContainer className="h-9 w-9">
            <Image fill src={imageUrl} alt={fullName} />
          </ImageContainer>
        </Link>
      ) : (
        <UnknownUser className="h-9 w-9" />
      )}
      <ListItemInfo>
        <ListItemTitle>
          <Link className="block truncate" href={`/customers/${id}`}>
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
            <Link className="block truncate" href={`tel:${phoneNumber}`}>
              {phoneNumber}
            </Link>
          ) : (
            "Phone number is not provided"
          )}
        </ListItemTitle>

        <ListItemText>Phone number</ListItemText>
      </ListItemInfo>
      <ListItemInfo className="@max-2xl:hidden">
        <ListItemTitle>
          {publicLink ? (
            <Link className="block truncate" href={publicLink}>
              {publicLink}
            </Link>
          ) : (
            "Link is not provided"
          )}
        </ListItemTitle>

        <ListItemText>Public link</ListItemText>
      </ListItemInfo>

      <ListItemInfo className="@max-4xl:hidden">
        <ListItemTitle>{company.name}</ListItemTitle>
        <ListItemText>Company</ListItemText>
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
