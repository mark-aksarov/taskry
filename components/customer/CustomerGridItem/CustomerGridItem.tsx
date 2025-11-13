"use client";

import {
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemContactList,
  GridItemContact,
  GridItemContactIconWrapper,
  GridItemContactText,
  GridItemRow,
} from "@/components/common/Grid";
import Image from "next/image";
import { Item } from "react-stately";
import { Button, Link, Checkbox, Divider } from "@/components/ui";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { Ellipsis, Link2, Mail, Phone, Trash } from "lucide-react";
import { ImageContainer } from "@/components/common/ImageContainer";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

interface CustomerGridItemProps {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  imageUrl?: string;
  company: {
    id: number;
    name: string;
  };
}

export function CustomerGridItem({
  id,
  fullName,
  email,
  phoneNumber,
  publicLink,
  imageUrl,
  company,
}: CustomerGridItemProps) {
  const contactLinkClasses = "max-w-full overflow-hidden";

  return (
    <CustomerGridItemLayout
      topRowSlot={
        <GridItemRow>
          <Checkbox aria-label={`${fullName} checkbox`} />
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
        </GridItemRow>
      }
      imageSlot={
        imageUrl ? (
          <Link href={`/customers/${id}`}>
            <ImageContainer className="h-20 w-20">
              <Image fill src={imageUrl} alt={fullName} />
            </ImageContainer>
          </Link>
        ) : (
          <ImageContainer className="h-20 w-20" />
        )
      }
      titleSlot={
        <GridItemInfo className="w-full items-center">
          <GridItemTitle>
            <Link className="block truncate" href={`/customers/${id}`}>
              {fullName}
            </Link>
          </GridItemTitle>

          <GridItemText>{company.name}</GridItemText>
        </GridItemInfo>
      }
      contactSlot={
        <>
          <Divider />
          <GridItemContactList>
            {phoneNumber ? (
              <Link className={contactLinkClasses} href={`tel:${phoneNumber}`}>
                <GridItemContact>
                  <GridItemContactIconWrapper>
                    <Phone size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </GridItemContactIconWrapper>
                  <GridItemContactText>{phoneNumber}</GridItemContactText>
                </GridItemContact>
              </Link>
            ) : (
              <GridItemContact>
                <GridItemContactIconWrapper>
                  <Phone size={16} strokeWidth={1.5} absoluteStrokeWidth />
                </GridItemContactIconWrapper>
                <GridItemContactText>No phone</GridItemContactText>
              </GridItemContact>
            )}

            {publicLink ? (
              <Link className={contactLinkClasses} href={publicLink}>
                <GridItemContact>
                  <GridItemContactIconWrapper>
                    <Link2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </GridItemContactIconWrapper>
                  <GridItemContactText>{publicLink}</GridItemContactText>
                </GridItemContact>
              </Link>
            ) : (
              <GridItemContact>
                <GridItemContactIconWrapper>
                  <Link2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
                </GridItemContactIconWrapper>
                <GridItemContactText>No public link</GridItemContactText>
              </GridItemContact>
            )}

            <Link className={contactLinkClasses} href={`mailto:${email}`}>
              <GridItemContact>
                <GridItemContactIconWrapper>
                  <Mail size={16} strokeWidth={1.5} absoluteStrokeWidth />
                </GridItemContactIconWrapper>
                <GridItemContactText>{email}</GridItemContactText>
              </GridItemContact>
            </Link>
          </GridItemContactList>
        </>
      }
    />
  );
}
