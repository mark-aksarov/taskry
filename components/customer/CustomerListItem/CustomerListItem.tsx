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

import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";

import { CustomerPreview } from "@/lib/queries/types";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";

export function CustomerListItem({ customer }: { customer?: CustomerPreview }) {
  return (
    <ListItem>
      {/* --- Creator Image --- */}
      {customer && <Checkbox aria-label="customer checkbox" />}

      {!customer ? (
        <ImageContainerSkeleton className="h-9 w-9" />
      ) : customer.imageUrl ? (
        <Link href={`/customers/${customer.id}`}>
          <ImageContainer className="h-9 w-9">
            <Image fill src={customer.imageUrl} alt={customer.fullName} />
          </ImageContainer>
        </Link>
      ) : (
        <ImageContainer className="h-9 w-9" />
      )}

      {/* --- Customer Details --- */}
      {!customer ? (
        <ListItemInfoSkeleton />
      ) : (
        <ListItemInfo>
          <ListItemTitle>
            <Link href={`/customers/${customer.id}`}>{customer.fullName}</Link>
          </ListItemTitle>

          <ListItemText>
            <Link href={`mailto:${customer.email}`}>{customer.email}</Link>
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
              <Link href={`tel:${customer.phoneNumber}`}>
                {customer.phoneNumber}
              </Link>
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
              <Link href={customer.publicLink}>{customer.publicLink}</Link>
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
        <MenuTriggerSkeleton />
      ) : (
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
      )}
    </ListItem>
  );
}
