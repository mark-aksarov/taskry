"use client";

import {
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemContact,
  GridItemContactList,
  GridItemContactText,
  GridItemContactIconWrapper,
} from "@/components/common/Grid";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link2, Mail, Phone } from "lucide-react";
import { UserDetailModal } from "../UserDetailModal";
import { UserGridItemLayout } from "./UserGridItemLayout";
import { Link, Checkbox, Divider } from "@/components/ui";
import { UnknownUser } from "@/components/common/UnknownUser";
import { UserDetailBottomSheet } from "../UserDetailBottomSheet";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserItemActionMenuTrigger } from "../UserItemActionMenuTrigger";

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
  const t = useTranslations("users.UserGridItem");

  const contactLinkClasses = "max-w-full overflow-hidden";

  const userImg = imageUrl ? (
    <ImageContainer className="h-20 w-20">
      <Image fill src={imageUrl} alt={fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-20 w-20" iconSize={48} />
  );

  return (
    <UserGridItemLayout
      checkboxSlot={<Checkbox aria-label={`${fullName} checkbox`} />}
      actionMenuSlot={<UserItemActionMenuTrigger className="-mr-2" />}
      imageSlot={
        <>
          <ItemBaseDetailModalTrigger modal={<UserDetailModal userId={id} />}>
            {userImg}
          </ItemBaseDetailModalTrigger>

          <ItemBaseDetailBottomSheetTrigger
            renderBottomSheet={(state) => (
              <UserDetailBottomSheet userId={id} state={state} />
            )}
          >
            {userImg}
          </ItemBaseDetailBottomSheetTrigger>
        </>
      }
      titleSlot={
        <GridItemInfo className="w-full items-center">
          <GridItemTitle>
            <ItemBaseDetailModalTrigger
              modal={<UserDetailModal userId={id} />}
              className="truncate"
            >
              {fullName}
            </ItemBaseDetailModalTrigger>

            <ItemBaseDetailBottomSheetTrigger
              renderBottomSheet={(state) => (
                <UserDetailBottomSheet userId={id} state={state} />
              )}
              className="truncate"
            >
              {fullName}
            </ItemBaseDetailBottomSheetTrigger>
          </GridItemTitle>

          <GridItemText>
            {position ? position.name : t("unknownPosition")}
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
                <GridItemContactText>{t("noPhoneNumber")}</GridItemContactText>
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
                <GridItemContactText>{t("noPublicLink")}</GridItemContactText>
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
