"use client";

import {
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemContact,
  GridItemContactList,
  GridItemContactText,
  GridItemContactIconWrapper,
  GridItemTitleDetailModalTrigger,
  GridItemContactLink,
} from "@/components/common/Grid";

import { memo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/components/ui/Link";
import { Link2, Mail, Phone } from "lucide-react";
import { UserDetailModal } from "../UserDetailModal";
import { Separator } from "@/components/ui/Separator";
import { UserGridItemLayout } from "./UserGridItemLayout";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserItemActionMenuTrigger, UserItemProps } from "../UserItem";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { ItemBaseDetailModalTrigger } from "@/components/common/ItemBase";

export const UserGridItem = memo(
  ({
    id,
    fullName,
    imageUrl,
    position,
    phoneNumber,
    publicLink,
    email,
    editUserFormContainer,
    userDetailContainer,
    userDetailHeaderContainer,
  }: Omit<UserItemProps, "deleteUser" | "updateUser">) => {
    const t = useTranslations("users.UserGridItem");

    const { isOwner, isGuest } = useCurrentUser();

    const userImg = imageUrl ? (
      <ImageContainer className="h-9 w-9">
        <Image src={imageUrl} alt={fullName} width={36} height={36} />
      </ImageContainer>
    ) : (
      <UnknownUser className="h-9 w-9" />
    );

    const userDetailModal = (
      <UserDetailModal
        userId={id}
        userDetailContainer={userDetailContainer}
        userDetailHeaderContainer={userDetailHeaderContainer}
      />
    );

    // We show the action menu only for owners and guests
    const showActionMenuTrigger = isOwner || isGuest;

    return (
      <UserGridItemLayout
        actionMenuSlot={
          showActionMenuTrigger ? (
            <UserItemActionMenuTrigger
              editUserFormContainer={editUserFormContainer}
              userId={id}
              userFullName={fullName}
              className="-mr-2"
            />
          ) : undefined
        }
        imageSlot={
          <>
            {/* Show modal on desktop */}
            <ItemBaseDetailModalTrigger
              className="max-md:hidden"
              modal={userDetailModal}
            >
              {userImg}
            </ItemBaseDetailModalTrigger>

            {/* Show link on mobile */}
            <Link className="md:hidden" href={`/team/${id}`}>
              {userImg}
            </Link>
          </>
        }
        titleSlot={
          <>
            {/* Show modal on desktop */}
            <GridItemInfo className="flex-auto max-md:hidden">
              <GridItemTitleDetailModalTrigger modal={userDetailModal}>
                {fullName}
              </GridItemTitleDetailModalTrigger>

              <GridItemText>
                {position ? position.name : t("noPosition")}
              </GridItemText>
            </GridItemInfo>

            {/* Show only text on mobile */}
            <GridItemInfo className="flex-auto md:hidden">
              <GridItemTitle>{fullName}</GridItemTitle>
              <GridItemText>
                {position ? position.name : t("noPosition")}
              </GridItemText>
            </GridItemInfo>
          </>
        }
        phoneNumberSlot={
          <>
            <Separator />
            <GridItemContactList>
              {phoneNumber ? (
                <GridItemContactLink href={`tel:${phoneNumber}`}>
                  <GridItemContactIconWrapper>
                    <Phone size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </GridItemContactIconWrapper>
                  <GridItemContactText>{phoneNumber}</GridItemContactText>
                </GridItemContactLink>
              ) : (
                <GridItemContact>
                  <GridItemContactIconWrapper>
                    <Phone size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </GridItemContactIconWrapper>
                  <GridItemContactText>
                    {t("noPhoneNumber")}
                  </GridItemContactText>
                </GridItemContact>
              )}

              {publicLink ? (
                <GridItemContactLink href={publicLink}>
                  <GridItemContactIconWrapper>
                    <Link2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </GridItemContactIconWrapper>
                  <GridItemContactText>{publicLink}</GridItemContactText>
                </GridItemContactLink>
              ) : (
                <GridItemContact>
                  <GridItemContactIconWrapper>
                    <Link2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </GridItemContactIconWrapper>
                  <GridItemContactText>{t("noPublicLink")}</GridItemContactText>
                </GridItemContact>
              )}

              <GridItemContactLink href={`mailto:${email}`}>
                <GridItemContactIconWrapper>
                  <Mail size={16} strokeWidth={1.5} absoluteStrokeWidth />
                </GridItemContactIconWrapper>
                <GridItemContactText>{email}</GridItemContactText>
              </GridItemContactLink>
            </GridItemContactList>
          </>
        }
      />
    );
  },
);
