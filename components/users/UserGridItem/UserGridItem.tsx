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

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/components/ui/Link";
import { Link2, Mail, Phone } from "lucide-react";
import { UserDetailModal } from "../UserDetailModal";
import { Separator } from "@/components/ui/Separator";
import { UserGridItemLayout } from "./UserGridItemLayout";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { ItemBaseDetailModalTrigger } from "@/components/common/ItemBase";
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
  guestMode: boolean;
  showUserActionMenuTrigger: boolean;
  showDeleteMenuItem: boolean;
  editUserFormContainer: React.ReactNode;
  userDetailContainer: React.ReactNode;
}

export function UserGridItem({
  id,
  fullName,
  imageUrl,
  position,
  phoneNumber,
  publicLink,
  email,
  guestMode,
  showUserActionMenuTrigger,
  showDeleteMenuItem,
  editUserFormContainer,
  userDetailContainer,
}: UserGridItemProps) {
  const t = useTranslations("users.UserGridItem");

  const contactLinkClasses = "max-w-full overflow-hidden";

  const userImg = imageUrl ? (
    <ImageContainer className="h-20 w-20">
      <Image src={imageUrl} alt={fullName} width={80} height={80} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-20 w-20" iconSize={48} />
  );

  const userDetailModal = (
    <UserDetailModal userId={id} userDetailContainer={userDetailContainer} />
  );

  return (
    <UserGridItemLayout
      actionMenuSlot={
        showUserActionMenuTrigger && (
          <UserItemActionMenuTrigger
            showDeleteMenuItem={showDeleteMenuItem}
            guestMode={guestMode}
            editUserFormContainer={editUserFormContainer}
            userId={id}
            userFullName={fullName}
            className="-mr-2"
          />
        )
      }
      imageSlot={
        <>
          <ItemBaseDetailModalTrigger
            className="max-md:hidden"
            modal={userDetailModal}
          >
            {userImg}
          </ItemBaseDetailModalTrigger>

          <Link className="md:hidden" href={`/team/${id}`}>
            {userImg}
          </Link>
        </>
      }
      titleSlot={
        <GridItemInfo className="w-full items-center">
          <GridItemTitle>
            <ItemBaseDetailModalTrigger
              modal={userDetailModal}
              className="truncate max-md:hidden"
            >
              {fullName}
            </ItemBaseDetailModalTrigger>

            <Link className="block truncate md:hidden" href={`/team/${id}`}>
              {fullName}
            </Link>
          </GridItemTitle>

          <GridItemText>
            {position ? position.name : t("noPosition")}
          </GridItemText>
        </GridItemInfo>
      }
      phoneNumberSlot={
        <>
          <Separator />
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
