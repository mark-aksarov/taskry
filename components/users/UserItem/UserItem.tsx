"use client";

import { Ellipsis, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { Item } from "react-stately";

import { Button, Checkbox, Link } from "@/components/ui";

import {
  ItemCard,
  ItemCardActionMenuDialogHeader,
  itemCardActionMenuItemStyles,
  ItemCardActionMenuSkeleton,
  ItemCardField,
  ItemCardFieldBox,
  ItemCardFieldLink,
  ItemCardFieldSkeleton,
  ItemCardFieldText,
  ItemCardFieldTitle,
  ItemCardImageField,
  ItemCardImageFieldSkeleton,
} from "@/components/common/ItemCard";

import { UserPreview } from "@/lib/queries/types";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

export function UserItem({
  user,
  showCheckbox,
}: {
  user?: UserPreview;
  showCheckbox?: boolean;
}) {
  return (
    <ItemCard>
      {/* --- Creator Image & Menu --- */}
      {user && showCheckbox && <Checkbox aria-label="user checkbox" />}

      {!user ? (
        <ItemCardImageFieldSkeleton />
      ) : user.imageUrl ? (
        <Link href={`/users/${user.id}`}>
          <ItemCardImageField>
            <Image fill src={user.imageUrl} alt={user.name} />
          </ItemCardImageField>
        </Link>
      ) : (
        <ItemCardImageField />
      )}

      {/* --- User Details --- */}
      {!user ? (
        <ItemCardFieldSkeleton />
      ) : (
        <ItemCardField>
          <ItemCardFieldBox>
            <ItemCardFieldTitle>
              <ItemCardFieldLink href={`/users/${user.id}`}>
                {user.name}
              </ItemCardFieldLink>
            </ItemCardFieldTitle>
          </ItemCardFieldBox>

          <ItemCardFieldBox>
            <ItemCardFieldText>
              <ItemCardFieldLink href={`mailto:${user.email}`}>
                {user.email}
              </ItemCardFieldLink>
            </ItemCardFieldText>
          </ItemCardFieldBox>
        </ItemCardField>
      )}

      {/* --- User Phone --- */}
      {!user ? (
        <ItemCardFieldSkeleton className="@max-lg:hidden" />
      ) : (
        <ItemCardField className="@max-lg:hidden">
          <ItemCardFieldBox>
            <ItemCardFieldTitle>Phone number</ItemCardFieldTitle>
          </ItemCardFieldBox>

          <ItemCardFieldBox>
            <ItemCardFieldText>{user.phone}</ItemCardFieldText>
          </ItemCardFieldBox>
        </ItemCardField>
      )}

      {/* --- User Public link --- */}
      {!user ? (
        <ItemCardFieldSkeleton className="@max-2xl:hidden" />
      ) : (
        <ItemCardField className="@max-2xl:hidden">
          <ItemCardFieldBox>
            <ItemCardFieldTitle>Public link</ItemCardFieldTitle>
          </ItemCardFieldBox>

          <ItemCardFieldBox>
            <ItemCardFieldText>
              {user.publicLink ? (
                <ItemCardFieldLink href={user.publicLink}>
                  {user.publicLink}
                </ItemCardFieldLink>
              ) : (
                "Link is not provided"
              )}
            </ItemCardFieldText>
          </ItemCardFieldBox>
        </ItemCardField>
      )}

      {/* --- User Position --- */}
      {!user ? (
        <ItemCardFieldSkeleton className="@max-4xl:hidden" />
      ) : (
        <ItemCardField className="@max-4xl:hidden">
          <ItemCardFieldTitle>Position</ItemCardFieldTitle>
          <ItemCardFieldText>
            {user.position ? user.position.name : "Unknown position"}
          </ItemCardFieldText>
        </ItemCardField>
      )}

      {!user ? (
        <ItemCardActionMenuSkeleton />
      ) : (
        <ResponsiveMenuTrigger
          placement="bottom right"
          renderDialogHeader={() => <ItemCardActionMenuDialogHeader />}
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
            <div className={itemCardActionMenuItemStyles}>
              <Pencil size={16} /> Edit
            </div>
          </Item>
          <Item textValue="Delete" key="delete">
            <div className={itemCardActionMenuItemStyles}>
              <Trash size={16} /> Delete
            </div>
          </Item>
        </ResponsiveMenuTrigger>
      )}
    </ItemCard>
  );
}
