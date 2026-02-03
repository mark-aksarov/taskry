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
import { Link } from "@/components/ui/Link";
import { Link2, Mail, Phone } from "lucide-react";
import { Divider } from "@/components/ui/Divider";
import { Checkbox } from "@/components/ui/Checkbox";
import { UserGridItemLayout } from "./UserGridItemLayout";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";

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
  menuTrigger: React.ReactNode;
  userDetailModal: React.ReactNode;
  userDetailBottomSheet: React.ReactNode;
}

export function UserGridItem({
  id,
  fullName,
  imageUrl,
  position,
  phoneNumber,
  publicLink,
  email,
  menuTrigger,
  userDetailModal,
  userDetailBottomSheet,
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
      actionMenuSlot={menuTrigger}
      imageSlot={
        <>
          <ItemBaseDetailModalTrigger modal={userDetailModal}>
            {userImg}
          </ItemBaseDetailModalTrigger>

          <ItemBaseDetailBottomSheetTrigger bottomSheet={userDetailBottomSheet}>
            {userImg}
          </ItemBaseDetailBottomSheetTrigger>
        </>
      }
      titleSlot={
        <GridItemInfo className="w-full items-center">
          <GridItemTitle>
            <ItemBaseDetailModalTrigger
              modal={userDetailModal}
              className="truncate"
            >
              {fullName}
            </ItemBaseDetailModalTrigger>

            <ItemBaseDetailBottomSheetTrigger
              bottomSheet={userDetailBottomSheet}
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
