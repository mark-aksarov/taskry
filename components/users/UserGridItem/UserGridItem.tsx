"use client";

import {
  GridItem,
  gridItemActionMenuItemStyles,
  GridItemImageContainer,
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemTop,
  GridItemInfoSkeleton,
  GridItemImageContainerSkeleton,
  GridItemActionMenuDialogHeader,
  GridItemActionMenuSkeleton,
  GridItemLink,
  GridItemContactLink,
  GridItemContactList,
  GridItemContact,
  GridItemContactIconWrapper,
  GridItemContactText,
  GridItemContactListSkeleton,
} from "@/components/common/Grid";

import { Item } from "react-stately";
import { Ellipsis, Link2, Mail, Phone, Trash } from "lucide-react";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

import { UserPreview } from "@/lib/queries/types";
import { Button, Link, Checkbox, Divider, Skeleton } from "@/components/ui";
import Image from "next/image";

export function UserGridItem({ user }: { user?: UserPreview }) {
  return (
    <GridItem>
      {/* --- Checkbox & Menu --- */}
      <GridItemTop>
        {!user ? (
          <GridItemActionMenuSkeleton />
        ) : (
          <>
            <Checkbox aria-label={`${user.name} checkbox`} />
            <ResponsiveMenuTrigger
              placement="bottom right"
              renderDialogHeader={() => <GridItemActionMenuDialogHeader />}
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
              <Item textValue="Delete" key="delete">
                <div className={gridItemActionMenuItemStyles}>
                  <Trash size={16} /> Delete
                </div>
              </Item>
            </ResponsiveMenuTrigger>
          </>
        )}
      </GridItemTop>

      <div className="flex flex-col items-center justify-between gap-4">
        {/* --- User Image --- */}
        {!user ? (
          <GridItemImageContainerSkeleton className="h-20 w-20" />
        ) : user.imageUrl ? (
          <Link href={`/users/${user.id}`}>
            <GridItemImageContainer className="h-20 w-20">
              <Image fill src={user.imageUrl} alt={user.name} />
            </GridItemImageContainer>
          </Link>
        ) : (
          <GridItemImageContainer className="h-20 w-20" />
        )}

        {/* --- User Details --- */}
        {!user ? (
          <GridItemInfoSkeleton className="w-full items-center" />
        ) : (
          <GridItemInfo className="w-full items-center">
            <GridItemTitle>
              <GridItemLink href={`/tasks/${user.id}`}>
                {user.name}
              </GridItemLink>
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
            {user.phone ? (
              <GridItemContact>
                <GridItemContactLink href={`tel:${user.phone}`}>
                  <GridItemContactIconWrapper>
                    <Phone size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </GridItemContactIconWrapper>
                  <GridItemContactText>{user.phone}</GridItemContactText>
                </GridItemContactLink>
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
                <GridItemContactLink href={user.publicLink}>
                  <GridItemContactIconWrapper>
                    <Link2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </GridItemContactIconWrapper>
                  <GridItemContactText>{user.publicLink}</GridItemContactText>
                </GridItemContactLink>
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
              <GridItemContactLink href={`mailto:${user.email}`}>
                <GridItemContactIconWrapper>
                  <Mail size={16} strokeWidth={1.5} absoluteStrokeWidth />
                </GridItemContactIconWrapper>
                <GridItemContactText>{user.email}</GridItemContactText>
              </GridItemContactLink>
            </GridItemContact>
          </GridItemContactList>
        </>
      )}
    </GridItem>
  );
}
