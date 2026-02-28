"use client";

import {
  ListItemText,
  ListItemTextLink,
  ListItemTitle,
  ListItemTitleDetailModalTrigger,
} from "@/components/common/List";
import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import { memo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/components/ui/Link";
import { CustomerItemPendingOverlay } from "../CustomerItem";
import { CustomerDetailModal } from "../CustomerDetailModal";
import { UnknownUser } from "@/components/common/UnknownUser";
import { CustomerListItemLayout } from "./CustomerListItemLayout";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ImageContainer } from "@/components/common/ImageContainer";
import { ItemBaseDetailModalTrigger } from "@/components/common/ItemBase";
import { ListItemTitleLink } from "@/components/common/List/ListItemTitle";
import { CustomerItemCheckbox } from "../CustomerItem/CustomerItemCheckbox";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { DeleteCustomerTransitionProvider } from "../DeleteCustomerTransitionContext";
import { CustomerItemActionMenuTrigger } from "../CustomerItem/CustomerItemActionMenuTrigger";
import { UpdateCustomerTransitionProvider } from "../UpdateCustomerTransitionContext";

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
  customerDetailContainer: React.ReactNode;
  editCustomerFormContainer: React.ReactNode;
  deleteCustomer: ActionFn<ActionState, DeleteCustomersPayload>;
};

export function CustomerListItem(props: CustomerListItemProps) {
  const selected = useSelectedItems();

  return (
    <DeleteCustomerTransitionProvider>
      <UpdateCustomerTransitionProvider>
        <CustomerItemPendingOverlay customerId={props.id}>
          <SelectableItem {...selected} item={{ id: props.id }}>
            <CustomerListItemInner {...props} />
          </SelectableItem>
        </CustomerItemPendingOverlay>
      </UpdateCustomerTransitionProvider>
    </DeleteCustomerTransitionProvider>
  );
}

const CustomerListItemInner = memo(
  ({
    id,
    fullName,
    email,
    phoneNumber,
    publicLink,
    imageUrl,
    company,
    customerDetailContainer,
    editCustomerFormContainer,
    deleteCustomer,
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
        mainSlot={
          <>
            <ListItemTitleDetailModalTrigger modal={customerDetailModal}>
              {fullName}
            </ListItemTitleDetailModalTrigger>

            <ListItemTextLink href={`mailto:${email}`}>
              {email}
            </ListItemTextLink>
          </>
        }
        mainMobileSlot={
          <>
            <ListItemTitle>{fullName}</ListItemTitle>
            <ListItemText>{email}</ListItemText>
          </>
        }
        phoneNumberSlot={
          <>
            {phoneNumber ? (
              <ListItemTitleLink href={`tel:${phoneNumber}`}>
                {phoneNumber}
              </ListItemTitleLink>
            ) : (
              <ListItemTitle>{t("noPhoneNumber")}</ListItemTitle>
            )}

            <ListItemText>{t("phoneNumber")}</ListItemText>
          </>
        }
        publicLinkSlot={
          <>
            {publicLink ? (
              <ListItemTitleLink href={publicLink}>
                {publicLink}
              </ListItemTitleLink>
            ) : (
              <ListItemTitle>{t("noPublicLink")}</ListItemTitle>
            )}

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
            customerId={id}
            customerFullName={fullName}
            editCustomerFormContainer={editCustomerFormContainer}
            deleteCustomer={deleteCustomer}
          />
        }
      />
    );
  },
);
