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

import {
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";

import {
  useCustomerSelection,
  useSyncSelectionCustomerItem,
} from "@/lib/hooks/useCustomerSelection";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link2, Mail, Phone } from "lucide-react";
import { Link, Checkbox, Divider } from "@/components/ui";
import { UnknownUser } from "@/components/common/UnknownUser";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { ImageContainer } from "@/components/common/ImageContainer";
import { CustomerDetailModal } from "../CustomerDetailModal/CustomerDetailModal";
import { CustomerDetailBottomSheet } from "../CustomerDetailBottomSheet/CustomerDetailBottomSheet";

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
  menuTrigger: React.ReactNode;
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
}: CustomerGridItemProps) {
  const t = useTranslations("customers.CustomerGridItem");

  const { isSelected, toggleItem } = useCustomerSelection();
  useSyncSelectionCustomerItem(id, fullName);

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
          <Checkbox
            aria-label={`${fullName} checkbox`}
            isSelected={isSelected(id)}
            onChange={() => toggleItem(id)}
          />
          {menuTrigger}
        </GridItemRow>
      }
      imageSlot={
        <>
          <ItemBaseDetailModalTrigger
            modal={<CustomerDetailModal customerId={id} />}
          >
            {customerImg}
          </ItemBaseDetailModalTrigger>

          <ItemBaseDetailBottomSheetTrigger
            renderBottomSheet={(state) => (
              <CustomerDetailBottomSheet customerId={id} state={state} />
            )}
          >
            {customerImg}
          </ItemBaseDetailBottomSheetTrigger>
        </>
      }
      titleSlot={
        <GridItemInfo className="w-full items-center">
          <GridItemTitle>
            <ItemBaseDetailModalTrigger
              modal={<CustomerDetailModal customerId={id} />}
              className="truncate"
            >
              {fullName}
            </ItemBaseDetailModalTrigger>

            <ItemBaseDetailBottomSheetTrigger
              renderBottomSheet={(state) => (
                <CustomerDetailBottomSheet customerId={id} state={state} />
              )}
              className="truncate"
            >
              {fullName}
            </ItemBaseDetailBottomSheetTrigger>
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
