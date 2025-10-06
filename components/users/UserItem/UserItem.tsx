"use client";

import {
  ItemCard,
  ItemCardActionMenuDialogHeader,
  itemCardActionMenuItemStyles,
  ItemCardActionMenuSkeleton,
  ItemCardField,
  ItemCardFieldSkeleton,
  ItemCardFieldText,
  ItemCardFieldTitle,
  ItemCardImageField,
  ItemCardImageFieldSkeleton,
} from "@/components/common/ItemCard";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { UserPreview } from "@/lib/queries/types";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { Item } from "react-stately";

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
        <ItemCardImageFieldSkeleton className="h-9 w-9" />
      ) : (
        <ItemCardImageField className="h-9 w-9">
          {user.imageUrl && <Image fill src={user.imageUrl} alt={user.name} />}
        </ItemCardImageField>
      )}

      {/* --- User Details --- */}
      {!user ? (
        <ItemCardFieldSkeleton />
      ) : (
        <ItemCardField>
          <ItemCardFieldTitle>{user.name}</ItemCardFieldTitle>
          <ItemCardFieldText>{user.email}</ItemCardFieldText>
        </ItemCardField>
      )}

      {/* --- User Phone --- */}
      {!user ? (
        <ItemCardFieldSkeleton className="@max-lg:hidden" />
      ) : (
        <ItemCardField className="@max-lg:hidden">
          <ItemCardFieldTitle>Phone number</ItemCardFieldTitle>
          <ItemCardFieldText>{user.phone}</ItemCardFieldText>
        </ItemCardField>
      )}

      {/* --- User Public link --- */}
      {!user ? (
        <ItemCardFieldSkeleton className="@max-2xl:hidden" />
      ) : (
        <ItemCardField className="@max-2xl:hidden">
          <ItemCardFieldTitle>Public link</ItemCardFieldTitle>
          <ItemCardFieldText>{user.publicLink}</ItemCardFieldText>
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
