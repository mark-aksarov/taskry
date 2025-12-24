"use client";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

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
import { Checkbox, Link } from "@/components/ui";
import { CustomerDetailModal } from "../CustomerDetailModal";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { CustomerDetailBottomSheet } from "../CustomerDetailBottomSheet";
import { CustomerItemActionMenuTrigger } from "../CustomerItemActionMenuTrigger";

export type CustomerListItemProps = {
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
  deleteAction: ActionFn<ActionState, DeleteCustomersPayload>;
};

export function CustomerListItem({
  id,
  fullName,
  email,
  phoneNumber,
  publicLink,
  imageUrl,
  company,
  deleteAction,
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
    <ListItem>
      <Checkbox
        aria-label={t("checkboxAriaLabel")}
        isSelected={isSelected(id)}
        onChange={() => toggleItem(id)}
      />

      <>
        <ItemBaseDetailModalTrigger
          modal={<CustomerDetailModal customerId={id} />}
          className="h-9 w-9"
        >
          {userImg}
        </ItemBaseDetailModalTrigger>

        <ItemBaseDetailBottomSheetTrigger
          renderBottomSheet={(state) => (
            <CustomerDetailBottomSheet customerId={id} state={state} />
          )}
          className="h-9 w-9"
        >
          {userImg}
        </ItemBaseDetailBottomSheetTrigger>
      </>

      <ListItemInfo>
        <ListItemTitle>
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
        <ListItemTitle>{company.name}</ListItemTitle>
        <ListItemText>{t("company")}</ListItemText>
      </ListItemInfo>

      <CustomerItemActionMenuTrigger
        customerId={id}
        customerFullName={fullName}
        deleteAction={deleteAction}
      />
    </ListItem>
  );
}
