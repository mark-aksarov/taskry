"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

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
import { Link } from "@/components/ui/Link";
import { Checkbox } from "@/components/ui/Checkbox";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";

export type CustomerListItemProps = {
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
  customerDetailBottomSheet: React.ReactNode;
};

export function CustomerListItem({
  id,
  fullName,
  email,
  phoneNumber,
  publicLink,
  imageUrl,
  company,
  menuTrigger,
  customerDetailModal,
  customerDetailBottomSheet,
}: CustomerListItemProps) {
  const t = useTranslations("customers.CustomerListItem");

  const { isSelected, toggleItem } = useCustomerSelection();
  useSyncSelectionCustomerItem(id, fullName);

  const userImg = imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image fill src={imageUrl} alt={fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <ListItem data-test="customer-list-item" data-id={id}>
      <Checkbox
        data-test="customer-checkbox"
        data-id={id}
        aria-label={t("checkboxAriaLabel")}
        isSelected={isSelected(id)}
        onChange={() => toggleItem(id)}
      />

      <>
        <ItemBaseDetailModalTrigger
          modal={customerDetailModal}
          className="h-9 w-9"
        >
          {userImg}
        </ItemBaseDetailModalTrigger>

        <ItemBaseDetailBottomSheetTrigger
          bottomSheet={customerDetailBottomSheet}
          className="h-9 w-9"
        >
          {userImg}
        </ItemBaseDetailBottomSheetTrigger>
      </>

      <ListItemInfo>
        <ListItemTitle>
          <ItemBaseDetailModalTrigger
            modal={customerDetailModal}
            className="truncate"
          >
            {fullName}
          </ItemBaseDetailModalTrigger>

          <ItemBaseDetailBottomSheetTrigger
            bottomSheet={customerDetailBottomSheet}
            className="truncate"
          >
            {fullName}
          </ItemBaseDetailBottomSheetTrigger>
        </ListItemTitle>

        <ListItemText>
          <Link className="block truncate" href={`mailto:${email}`}>
            {email}
          </Link>
        </ListItemText>
      </ListItemInfo>
      <ListItemInfo className="@max-lg:hidden">
        <ListItemTitle>
          {phoneNumber ? (
            <Link className="block truncate" href={`tel:${phoneNumber}`}>
              {phoneNumber}
            </Link>
          ) : (
            t("noPhoneNumber")
          )}
        </ListItemTitle>

        <ListItemText>{t("phoneNumber")}</ListItemText>
      </ListItemInfo>
      <ListItemInfo className="@max-2xl:hidden">
        <ListItemTitle>
          {publicLink ? (
            <Link className="block truncate" href={publicLink}>
              {publicLink}
            </Link>
          ) : (
            t("noPublicLink")
          )}
        </ListItemTitle>

        <ListItemText>{t("publicLink")}</ListItemText>
      </ListItemInfo>

      <ListItemInfo className="@max-4xl:hidden">
        <ListItemTitle>{company ? company.name : t("noCompany")}</ListItemTitle>
        <ListItemText>{t("company")}</ListItemText>
      </ListItemInfo>

      {menuTrigger}
    </ListItem>
  );
}
