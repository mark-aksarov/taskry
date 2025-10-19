"use client";

import {
  GridItem,
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemTop,
  GridItemInfoSkeleton,
  GridItemContactList,
  GridItemContact,
  GridItemContactIconWrapper,
  GridItemContactText,
  GridItemContactListSkeleton,
} from "@/components/common/Grid";

import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";

import { Item } from "react-stately";
import { Ellipsis, Link2, Mail, Phone, Trash } from "lucide-react";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

import { CustomerPreview } from "@/lib/queries/types";
import { Button, Link, Checkbox, Divider, Skeleton } from "@/components/ui";
import Image from "next/image";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";

export function CustomerGridItem({ customer }: { customer?: CustomerPreview }) {
  return (
    <GridItem>
      {/* --- Checkbox --- */}
      <GridItemTop>
        {!customer ? (
          <MenuTriggerSkeleton className="-mr-2 ml-auto" />
        ) : (
          <>
            <Checkbox aria-label={`${customer.fullName} checkbox`} />
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
              <Item textValue="Delete" key="delete">
                <Trash size={16} /> Delete
              </Item>
            </ResponsiveMenuTrigger>
          </>
        )}
      </GridItemTop>

      <div className="flex flex-col items-center justify-between gap-4">
        {/* --- Customer Image --- */}
        {!customer ? (
          <ImageContainerSkeleton className="h-20 w-20" />
        ) : customer.imageUrl ? (
          <Link href={`/customers/${customer.id}`}>
            <ImageContainer className="h-20 w-20">
              <Image fill src={customer.imageUrl} alt={customer.fullName} />
            </ImageContainer>
          </Link>
        ) : (
          <ImageContainer className="h-20 w-20" />
        )}

        {/* --- Customer Details --- */}
        {!customer ? (
          <GridItemInfoSkeleton className="w-full items-center" />
        ) : (
          <GridItemInfo className="w-full items-center">
            <GridItemTitle>
              <Link href={`/customers/${customer.id}`}>
                {customer.fullName}
              </Link>
            </GridItemTitle>

            <GridItemText>{customer.company.name}</GridItemText>
          </GridItemInfo>
        )}
      </div>

      {/* --- Contacts --- */}
      {!customer ? (
        <>
          <Skeleton className="h-px" />
          <GridItemContactListSkeleton />
        </>
      ) : (
        <>
          <Divider />
          <GridItemContactList>
            {customer.phoneNumber ? (
              <GridItemContact>
                <Link href={`tel:${customer.phoneNumber}`} className="contents">
                  <GridItemContactIconWrapper>
                    <Phone size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </GridItemContactIconWrapper>
                  <GridItemContactText>
                    {customer.phoneNumber}
                  </GridItemContactText>
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

            {customer.publicLink ? (
              <GridItemContact>
                <Link href={customer.publicLink} className="contents">
                  <GridItemContactIconWrapper>
                    <Link2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </GridItemContactIconWrapper>
                  <GridItemContactText>
                    {customer.publicLink}
                  </GridItemContactText>
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
              <Link href={`mailto:${customer.email}`} className="contents">
                <GridItemContactIconWrapper>
                  <Mail size={16} strokeWidth={1.5} absoluteStrokeWidth />
                </GridItemContactIconWrapper>
                <GridItemContactText>{customer.email}</GridItemContactText>
              </Link>
            </GridItemContact>
          </GridItemContactList>
        </>
      )}
    </GridItem>
  );
}
