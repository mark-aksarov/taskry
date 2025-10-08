"use client";

import { Ellipsis, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { Item } from "react-stately";

import { Button, Checkbox, Link } from "@/components/ui";

import {
  ListItem,
  ListItemActionMenuDialogHeader,
  listItemActionMenuItemStyles,
  ListItemActionMenuSkeleton,
  ListItemInfo,
  ListItemEllipsisWrapper,
  ListItemLink,
  ListItemInfoSkeleton,
  ListItemText,
  ListItemTitle,
  ListItemImageContainer,
  ListItemImageContainerSkeleton,
} from "@/components/common/List";

import { UserPreview } from "@/lib/queries/types";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

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
        <ListItemImageContainerSkeleton className="h-9 w-9" />
      ) : user.imageUrl ? (
        <Link href={`/users/${user.id}`}>
          <ListItemImageContainer className="h-9 w-9">
            <Image fill src={user.imageUrl} alt={user.name} />
          </ListItemImageContainer>
        </Link>
      ) : (
        <ListItemImageContainer className="h-9 w-9" />
      )}

      {/* --- User Details --- */}
      {!user ? (
        <ListItemInfoSkeleton />
      ) : (
        <ListItemInfo>
          <ListItemEllipsisWrapper>
            <ListItemTitle>
              <ListItemLink href={`/users/${user.id}`}>
                {user.name}
              </ListItemLink>
            </ListItemTitle>
          </ListItemEllipsisWrapper>

          <ListItemEllipsisWrapper>
            <ListItemText>
              <ListItemLink href={`mailto:${user.email}`}>
                {user.email}
              </ListItemLink>
            </ListItemText>
          </ListItemEllipsisWrapper>
        </ListItemInfo>
      )}

      {/* --- User Phone --- */}
      {!user ? (
        <ListItemInfoSkeleton className="@max-lg:hidden" />
      ) : (
        <ListItemInfo className="@max-lg:hidden">
          <ListItemEllipsisWrapper>
            <ListItemTitle>Phone number</ListItemTitle>
          </ListItemEllipsisWrapper>

          <ListItemEllipsisWrapper>
            <ListItemText>{user.phone}</ListItemText>
          </ListItemEllipsisWrapper>
        </ListItemInfo>
      )}

      {/* --- User Public link --- */}
      {!user ? (
        <ListItemInfoSkeleton className="@max-2xl:hidden" />
      ) : (
        <ListItemInfo className="@max-2xl:hidden">
          <ListItemEllipsisWrapper>
            <ListItemTitle>Public link</ListItemTitle>
          </ListItemEllipsisWrapper>

          <ListItemEllipsisWrapper>
            <ListItemText>
              {user.publicLink ? (
                <ListItemLink href={user.publicLink}>
                  {user.publicLink}
                </ListItemLink>
              ) : (
                "Link is not provided"
              )}
            </ListItemText>
          </ListItemEllipsisWrapper>
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
        <ListItemActionMenuSkeleton />
      ) : (
        <ResponsiveMenuTrigger
          placement="bottom right"
          renderDialogHeader={() => <ListItemActionMenuDialogHeader />}
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
            <div className={listItemActionMenuItemStyles}>
              <Pencil size={16} /> Edit
            </div>
          </Item>
          <Item textValue="Delete" key="delete">
            <div className={listItemActionMenuItemStyles}>
              <Trash size={16} /> Delete
            </div>
          </Item>
        </ResponsiveMenuTrigger>
      )}
    </ListItem>
  );
}
