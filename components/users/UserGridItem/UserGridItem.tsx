"use client";

import {
  GridItem,
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemRow,
  GridItemInfoSkeleton,
  GridItemContactList,
  GridItemContact,
  GridItemContactIconWrapper,
  GridItemContactText,
  GridItemContactListSkeleton,
} from "@/components/common/Grid";

import { Item } from "react-stately";
import { Ellipsis, Link2, Mail, Pencil, Phone, Trash } from "lucide-react";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

import { Button, Link, Checkbox, Divider, Skeleton } from "@/components/ui";
import Image from "next/image";
import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";

export interface UserGridItemType {
  id: string;
  fullName: string;
  imageUrl?: string | null;
  position?: {
    name: string;
  } | null;
  phoneNumber?: string | null;
  publicLink?: string | null;
  email: string;
}

export interface UserGridItemProps {
  user?: UserGridItemType | null;
}

export function UserGridItem({ user }: UserGridItemProps) {
  return (
    <GridItem>
      {/* --- Checkbox & Menu --- */}
      <GridItemRow>
        {!user ? (
          <MenuTriggerSkeleton className="-mr-2 ml-auto" />
        ) : (
          <>
            <Checkbox aria-label={`${user.fullName} checkbox`} />
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
                  className="-mr-2 rounded-full"
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
          </>
        )}
      </GridItemRow>

      <div className="flex flex-col items-center justify-between gap-4">
        {/* --- User Image --- */}
        {!user ? (
          <ImageContainerSkeleton className="h-20 w-20" />
        ) : user.imageUrl ? (
          <Link href={`/users/${user.id}`}>
            <ImageContainer className="h-20 w-20">
              <Image fill src={user.imageUrl} alt={user.fullName} />
            </ImageContainer>
          </Link>
        ) : (
          <ImageContainer className="h-20 w-20" />
        )}

        {/* --- User Details --- */}
        {!user ? (
          <GridItemInfoSkeleton className="w-full items-center" />
        ) : (
          <GridItemInfo className="w-full items-center">
            <GridItemTitle>
              <Link href={`/tasks/${user.id}`}>{user.fullName}</Link>
            </GridItemTitle>

            <GridItemText>
              {user.position ? user.position.name : "Unknown position"}
            </GridItemText>
          </GridItemInfo>
        )}
      </div>

      {/* --- Contacts --- */}
      {!user ? (
        <>
          <Skeleton className="h-px" />
          <GridItemContactListSkeleton />
        </>
      ) : (
        <>
          <Divider />
          <GridItemContactList>
            {user.phoneNumber ? (
              <GridItemContact>
                <Link href={`tel:${user.phoneNumber}`} className="contents">
                  <GridItemContactIconWrapper>
                    <Phone size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </GridItemContactIconWrapper>
                  <GridItemContactText>{user.phoneNumber}</GridItemContactText>
                </Link>
              </GridItemContact>
            ) : (
              <GridItemContact>
                <GridItemContactIconWrapper>
                  <Phone size={16} strokeWidth={1.5} absoluteStrokeWidth />
                </GridItemContactIconWrapper>
                <GridItemContactText>No phone</GridItemContactText>
              </GridItemContact>
            )}

            {user.publicLink ? (
              <GridItemContact>
                <Link href={user.publicLink} className="contents">
                  <GridItemContactIconWrapper>
                    <Link2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </GridItemContactIconWrapper>
                  <GridItemContactText>{user.publicLink}</GridItemContactText>
                </Link>
              </GridItemContact>
            ) : (
              <GridItemContact>
                <GridItemContactIconWrapper>
                  <Link2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
                </GridItemContactIconWrapper>
                <GridItemContactText>No public link</GridItemContactText>
              </GridItemContact>
            )}

            <GridItemContact>
              <Link href={`mailto:${user.email}`} className="contents">
                <GridItemContactIconWrapper>
                  <Mail size={16} strokeWidth={1.5} absoluteStrokeWidth />
                </GridItemContactIconWrapper>
                <GridItemContactText>{user.email}</GridItemContactText>
              </Link>
            </GridItemContact>
          </GridItemContactList>
        </>
      )}
    </GridItem>
  );
}
