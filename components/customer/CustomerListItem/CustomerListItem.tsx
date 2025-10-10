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
  ListItemLink,
  ListItemInfoSkeleton,
  ListItemText,
  ListItemTitle,
  ListItemImageContainer,
  ListItemImageContainerSkeleton,
} from "@/components/common/List";

import { CustomerPreview } from "@/lib/queries/types";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

export function CustomerListItem({ customer }: { customer?: CustomerPreview }) {
  return (
    <ListItem>
      {/* --- Creator Image --- */}
      {customer && <Checkbox aria-label="customer checkbox" />}

      {!customer ? (
        <ListItemImageContainerSkeleton className="h-9 w-9" />
      ) : customer.imageUrl ? (
        <Link href={`/customers/${customer.id}`}>
          <ListItemImageContainer className="h-9 w-9">
            <Image fill src={customer.imageUrl} alt={customer.fullName} />
          </ListItemImageContainer>
        </Link>
      ) : (
        <ListItemImageContainer className="h-9 w-9" />
      )}

      {/* --- Customer Details --- */}
      {!customer ? (
        <ListItemInfoSkeleton />
      ) : (
        <ListItemInfo>
          <ListItemTitle>
            <ListItemLink href={`/customers/${customer.id}`}>
              {customer.fullName}
            </ListItemLink>
          </ListItemTitle>

          <ListItemText>
            <ListItemLink href={`mailto:${customer.email}`}>
              {customer.email}
            </ListItemLink>
          </ListItemText>
        </ListItemInfo>
      )}

      {/* --- Customer Phone --- */}
      {!customer ? (
        <ListItemInfoSkeleton className="@max-lg:hidden" />
      ) : (
        <ListItemInfo className="@max-lg:hidden">
          <ListItemTitle>Phone number</ListItemTitle>

          <ListItemText>
            {customer.phoneNumber ? (
              <ListItemLink href={`tel:${customer.phoneNumber}`}>
                {customer.phoneNumber}
              </ListItemLink>
            ) : (
              "Phone number is not provided"
            )}
          </ListItemText>
        </ListItemInfo>
      )}

      {/* --- Customer Public link --- */}
      {!customer ? (
        <ListItemInfoSkeleton className="@max-2xl:hidden" />
      ) : (
        <ListItemInfo className="@max-2xl:hidden">
          <ListItemTitle>Public link</ListItemTitle>

          <ListItemText>
            {customer.publicLink ? (
              <ListItemLink href={customer.publicLink}>
                {customer.publicLink}
              </ListItemLink>
            ) : (
              "Link is not provided"
            )}
          </ListItemText>
        </ListItemInfo>
      )}

      {/* --- Customer Company --- */}
      {!customer ? (
        <ListItemInfoSkeleton className="@max-4xl:hidden" />
      ) : (
        <ListItemInfo className="@max-4xl:hidden">
          <ListItemTitle>Company</ListItemTitle>

          <ListItemText>{customer.company.name}</ListItemText>
        </ListItemInfo>
      )}

      {!customer ? (
        <ListItemActionMenuSkeleton />
      ) : (
        <ResponsiveMenuTrigger
          placement="bottom right"
          renderDialogHeader={() => <ListItemActionMenuDialogHeader />}
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
