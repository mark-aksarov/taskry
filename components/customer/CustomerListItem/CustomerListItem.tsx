"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";
import Image from "next/image";
import { Item } from "react-stately";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { Button, Checkbox, Link } from "@/components/ui";
import { ImageContainer } from "@/components/common/ImageContainer";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

export type CustomerListItemProps = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  publicLink?: string | null;
  imageUrl?: string | null;
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
        <ImageContainer className="h-9 w-9" />
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
        <ListItemTitle>Phone number</ListItemTitle>

        <ListItemText>
          {phoneNumber ? (
            <Link className="block truncate" href={`tel:${phoneNumber}`}>
              {phoneNumber}
            </Link>
          ) : (
            "Phone number is not provided"
          )}
        </ListItemText>
      </ListItemInfo>
      <ListItemInfo className="@max-2xl:hidden">
        <ListItemTitle>Public link</ListItemTitle>

        <ListItemText>
          {publicLink ? (
            <Link className="block truncate" href={publicLink}>
              {publicLink}
            </Link>
          ) : (
            "Link is not provided"
          )}
        </ListItemText>
      </ListItemInfo>

      <ListItemInfo className="@max-4xl:hidden">
        <ListItemTitle>Company</ListItemTitle>
        <ListItemText>{company.name}</ListItemText>
      </ListItemInfo>

      <ResponsiveMenuTrigger
        placement="bottom right"
        renderDialogHeader={() => <MenuDialogHeader heading="Actions" />}
        renderButton={() => (
          <Button
            aria-label="customer menu"
            variant="ghost"
            iconLeft={
              <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
            className="rounded-full"
          />
        )}
      >
        <Item textValue="Edit" key="edit">
          <Pencil size={16} /> Edit
        </Item>
        <Item textValue="Delete" key="delete">
          <Trash size={16} /> Delete
        </Item>
      </ResponsiveMenuTrigger>
    </ListItem>
  );
}
