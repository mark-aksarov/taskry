"use client";

import {
  GridItemRow,
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemContact,
  GridItemContactText,
  GridItemContactList,
  GridItemContactIconWrapper,
} from "@/components/common/Grid";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/components/ui/Link";
import { Link2, Mail, Phone } from "lucide-react";
import { Divider } from "@/components/ui/Divider";
import { UnknownUser } from "@/components/common/UnknownUser";
import { CustomerItemCheckbox } from "../CustomerItemCheckbox";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { ImageContainer } from "@/components/common/ImageContainer";
import { ItemBaseDetailModalTrigger } from "@/components/common/ItemBase";

interface CustomerGridItemProps {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  imageUrl?: string;
  company?: {
    id: number;
    name: string;
  };
  menuTrigger: React.ReactNode;
  customerDetailModal: React.ReactNode;
}

export function CustomerGridItem({
  id,
  fullName,
  email,
  phoneNumber,
  publicLink,
  imageUrl,
  company,
  menuTrigger,
  customerDetailModal,
}: CustomerGridItemProps) {
  const t = useTranslations("customers.CustomerGridItem");

  const contactLinkClasses = "max-w-full overflow-hidden";

  const customerImg = imageUrl ? (
    <ImageContainer className="h-20 w-20">
      <Image fill src={imageUrl} alt={fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-20 w-20" iconSize={48} />
  );

  return (
    <CustomerGridItemLayout
      topRowSlot={
        <GridItemRow>
          <CustomerItemCheckbox id={id} />
          {menuTrigger}
        </GridItemRow>
      }
      imageSlot={
        <>
          <ItemBaseDetailModalTrigger
            className="max-md:hidden"
            modal={customerDetailModal}
          >
            {customerImg}
          </ItemBaseDetailModalTrigger>

          <Link className="md:hidden" href={`/customers/${id}`}>
            {customerImg}
          </Link>
        </>
      }
      titleSlot={
        <GridItemInfo className="w-full items-center">
          <GridItemTitle>
            <ItemBaseDetailModalTrigger
              modal={customerDetailModal}
              className="truncate max-md:hidden"
            >
              {fullName}
            </ItemBaseDetailModalTrigger>

            <Link
              className="block truncate md:hidden"
              href={`/customers/${id}`}
            >
              {fullName}
            </Link>
          </GridItemTitle>

          <GridItemText>{company ? company.name : t("noCompany")}</GridItemText>
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
