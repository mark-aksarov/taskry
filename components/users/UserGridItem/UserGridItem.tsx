"use client";

import {
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemContactList,
  GridItemContact,
  GridItemContactIconWrapper,
  GridItemContactText,
} from "@/components/common/Grid";

import Image from "next/image";
import { Item } from "react-stately";
import { UserGridItemLayout } from "./UserGridItemLayout";
import { Link, Checkbox, Divider } from "@/components/ui";
import { Link2, Mail, Pencil, Phone, Trash } from "lucide-react";
import { ImageContainer } from "@/components/common/ImageContainer";
import { ItemBaseActionMenuTrigger } from "@/components/common/ItemBase";
import { UnknownUser } from "@/components/common/UnknownUser";

export interface UserGridItemProps {
  id: string;
  fullName: string;
  imageUrl?: string;
  position?: {
    name: string;
  };
  phoneNumber?: string;
  publicLink?: string;
  email: string;
}

export function UserGridItem({
  id,
  fullName,
  imageUrl,
  position,
  phoneNumber,
  publicLink,
  email,
}: UserGridItemProps) {
  const contactLinkClasses = "max-w-full overflow-hidden";

  return (
    <UserGridItemLayout
      checkboxSlot={<Checkbox aria-label={`${fullName} checkbox`} />}
      actionMenuSlot={
        <ItemBaseActionMenuTrigger>
          <Item textValue="Edit" key="edit">
            <Pencil size={16} /> Edit
          </Item>
          <Item textValue="Delete" key="delete">
            <Trash size={16} /> Delete
          </Item>
        </ItemBaseActionMenuTrigger>
      }
      imageSlot={
        imageUrl ? (
          <Link href={`/users/${id}`}>
            <ImageContainer className="h-20 w-20">
              <Image fill src={imageUrl} alt={fullName} />
            </ImageContainer>
          </Link>
        ) : (
          <UnknownUser className="h-20 w-20" iconSize={48} />
        )
      }
      titleSlot={
        <GridItemInfo className="w-full items-center">
          <GridItemTitle>
            <Link href={`/tasks/${id}`}>{fullName}</Link>
          </GridItemTitle>

          <GridItemText>
            {position ? position.name : "Unknown position"}
          </GridItemText>
        </GridItemInfo>
      }
      phoneNumberSlot={
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
