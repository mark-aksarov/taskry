"use client";

import { Ellipsis, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { Item } from "react-stately";

import { Button, Checkbox, Link } from "@/components/ui";

import {
  ListItem,
  ListItemInfo,
  ListItemInfoSkeleton,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { UserPreview } from "@/lib/queries/types";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";

export function UserListItem({
  user,
  showCheckbox,
}: {
  user?: UserPreview;
  showCheckbox?: boolean;
}) {
  return (
    <ListItem>
      {/* --- Creator Image & Menu --- */}
      {user && showCheckbox && <Checkbox aria-label="user checkbox" />}

      {!user ? (
        <ImageContainerSkeleton className="h-9 w-9" />
      ) : user.imageUrl ? (
        <Link href={`/users/${user.id}`}>
          <ImageContainer className="h-9 w-9">
            <Image fill src={user.imageUrl} alt={user.fullName} />
          </ImageContainer>
        </Link>
      ) : (
        <ImageContainer className="h-9 w-9" />
      )}

      {/* --- User Details --- */}
      {!user ? (
        <ListItemInfoSkeleton />
      ) : (
        <ListItemInfo>
          <ListItemTitle>
            <Link href={`/users/${user.id}`}>{user.fullName}</Link>
          </ListItemTitle>

          <ListItemText>
            <Link href={`mailto:${user.email}`}>{user.email}</Link>
          </ListItemText>
        </ListItemInfo>
      )}

      {/* --- User Phone --- */}
      {!user ? (
        <ListItemInfoSkeleton className="@max-lg:hidden" />
      ) : (
        <ListItemInfo className="@max-lg:hidden">
          <ListItemTitle>Phone number</ListItemTitle>

          <ListItemText>
            {user.phoneNumber ? (
              <Link href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</Link>
            ) : (
              "Phone number is not provided"
            )}
          </ListItemText>
        </ListItemInfo>
      )}

      {/* --- User Public link --- */}
      {!user ? (
        <ListItemInfoSkeleton className="@max-2xl:hidden" />
      ) : (
        <ListItemInfo className="@max-2xl:hidden">
          <ListItemTitle>Public link</ListItemTitle>

          <ListItemText>
            {user.publicLink ? (
              <Link href={user.publicLink}>{user.publicLink}</Link>
            ) : (
              "Link is not provided"
            )}
          </ListItemText>
        </ListItemInfo>
      )}

      {/* --- User Position --- */}
      {!user ? (
        <ListItemInfoSkeleton className="@max-4xl:hidden" />
      ) : (
        <ListItemInfo className="@max-4xl:hidden">
          <ListItemTitle>Position</ListItemTitle>

          <ListItemText>
            {user.position ? user.position.name : "Unknown position"}
          </ListItemText>
        </ListItemInfo>
      )}

      {!user ? (
        <MenuTriggerSkeleton />
      ) : (
        <ResponsiveMenuTrigger
          placement="bottom right"
          renderDialogHeader={() => <MenuDialogHeader heading="Actions" />}
          renderButton={() => (
            <Button
              aria-label="user menu"
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
      )}
    </ListItem>
  );
}
