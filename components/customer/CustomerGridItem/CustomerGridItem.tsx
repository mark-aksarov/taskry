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

import { CustomerPreview } from "@/lib/queries/types";
import { Button, Link, Checkbox, Divider, Skeleton } from "@/components/ui";
import Image from "next/image";

export function CustomerGridItem({ customer }: { customer?: CustomerPreview }) {
  return (
    <GridItem>
      {/* --- Checkbox --- */}
      <GridItemTop>
        {!customer ? (
          <GridItemActionMenuSkeleton />
        ) : (
          <>
            <Checkbox aria-label={`${customer.fullName} checkbox`} />
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
        {/* --- Customer Image --- */}
        {!customer ? (
          <GridItemImageContainerSkeleton className="h-20 w-20" />
        ) : customer.imageUrl ? (
          <Link href={`/customers/${customer.id}`}>
            <GridItemImageContainer className="h-20 w-20">
              <Image fill src={customer.imageUrl} alt={customer.fullName} />
            </GridItemImageContainer>
          </Link>
        ) : (
          <GridItemImageContainer className="h-20 w-20" />
        )}

        {/* --- Customer Details --- */}
        {!customer ? (
          <GridItemInfoSkeleton className="w-full items-center" />
        ) : (
          <GridItemInfo className="w-full items-center">
            <GridItemTitle>
              <GridItemLink href={`/customers/${customer.id}`}>
                {customer.fullName}
              </GridItemLink>
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
                <GridItemContactLink href={`tel:${customer.phoneNumber}`}>
                  <GridItemContactIconWrapper>
                    <Phone size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </GridItemContactIconWrapper>
                  <GridItemContactText>
                    {customer.phoneNumber}
                  </GridItemContactText>
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

            {customer.publicLink ? (
              <GridItemContact>
                <GridItemContactLink href={customer.publicLink}>
                  <GridItemContactIconWrapper>
                    <Link2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </GridItemContactIconWrapper>
                  <GridItemContactText>
                    {customer.publicLink}
                  </GridItemContactText>
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
              <GridItemContactLink href={`mailto:${customer.email}`}>
                <GridItemContactIconWrapper>
                  <Mail size={16} strokeWidth={1.5} absoluteStrokeWidth />
                </GridItemContactIconWrapper>
                <GridItemContactText>{customer.email}</GridItemContactText>
              </GridItemContactLink>
            </GridItemContact>
          </GridItemContactList>
        </>
      )}
    </GridItem>
  );
}
