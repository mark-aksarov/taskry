"use client";

import { memo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/components/ui/Link";
import { CustomerDetailModal } from "../CustomerDetailModal";
import { UnknownUser } from "@/components/common/UnknownUser";
import { CustomerItemCheckbox } from "../CustomerItemCheckbox";
import { CustomerListItemLayout } from "./CustomerListItemLayout";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ImageContainer } from "@/components/common/ImageContainer";
import { ListItemText, ListItemTitle } from "@/components/common/List";
import { ItemBaseDetailModalTrigger } from "@/components/common/ItemBase";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { CustomerItemActionMenuTrigger } from "../CustomerItemActionMenuTrigger";

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
  guestMode: boolean;
  customerDetailContainer: React.ReactNode;
  editCustomerFormContainer: React.ReactNode;
};

export function CustomerListItem(props: CustomerListItemProps) {
  const selected = useSelectedItems();

  return (
    <SelectableItem {...selected} item={{ id: props.id }}>
      <CustomerListItemInner {...props} />
    </SelectableItem>
  );
}

export const CustomerListItemInner = memo(
  ({
    id,
    fullName,
    email,
    phoneNumber,
    publicLink,
    imageUrl,
    company,
    guestMode,
    customerDetailContainer,
    editCustomerFormContainer,
  }: CustomerListItemProps) => {
    const t = useTranslations("customers.CustomerListItem");

    const userImg = imageUrl ? (
      <ImageContainer className="h-9 w-9">
        <Image src={imageUrl} alt={fullName} width={36} height={36} />
      </ImageContainer>
    ) : (
      <UnknownUser className="h-9 w-9" />
    );

    const customerDetailModal = (
      <CustomerDetailModal
        customerId={id}
        customerDetailContainer={customerDetailContainer}
      />
    );

    return (
      <CustomerListItemLayout
        id={id}
        checkboxSlot={<CustomerItemCheckbox id={id} />}
        imgSlot={
          <ItemBaseDetailModalTrigger
            modal={customerDetailModal}
            className="h-9 w-9 max-md:hidden"
          >
            {userImg}
          </ItemBaseDetailModalTrigger>
        }
        imgMobileSlot={
          <Link className="md:hidden" href={`/customers/${id}`}>
            {userImg}
          </Link>
        }
        infoSlot={
          <>
            <ListItemTitle>
              <ItemBaseDetailModalTrigger
                modal={customerDetailModal}
                className="truncate"
              >
                {fullName}
              </ItemBaseDetailModalTrigger>
            </ListItemTitle>

            <ListItemText>
              <Link className="block truncate" href={`mailto:${email}`}>
                {email}
              </Link>
            </ListItemText>
          </>
        }
        infoMobileSlot={
          <>
            <ListItemTitle>{fullName}</ListItemTitle>
            <ListItemText>{email}</ListItemText>
          </>
        }
        phoneNumberSlot={
          <>
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
          </>
        }
        publicLinkSlot={
          <>
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
          </>
        }
        companySlot={
          <>
            <ListItemTitle>
              {company ? company.name : t("noCompany")}
            </ListItemTitle>
            <ListItemText>{t("company")}</ListItemText>
          </>
        }
        menuTriggerSlot={
          <CustomerItemActionMenuTrigger
            guestMode={guestMode}
            customerId={id}
            customerFullName={fullName}
            editCustomerFormContainer={editCustomerFormContainer}
          />
        }
      />
    );
  },
);
