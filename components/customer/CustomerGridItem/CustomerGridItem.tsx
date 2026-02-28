"use client";

import {
  GridItemRow,
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemContact,
  GridItemContactText,
  GridItemContactList,
  GridItemContactLink,
  GridItemContactIconWrapper,
  GridItemTitleDetailModalTrigger,
} from "@/components/common/Grid";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import { memo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/components/ui/Link";
import { Link2, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/Separator";
import { CustomerItemPendingOverlay } from "../CustomerItem";
import { CustomerDetailModal } from "../CustomerDetailModal";
import { UnknownUser } from "@/components/common/UnknownUser";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ImageContainer } from "@/components/common/ImageContainer";
import { ItemBaseDetailModalTrigger } from "@/components/common/ItemBase";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { CustomerItemCheckbox } from "../CustomerItem/CustomerItemCheckbox";
import { DeleteCustomerTransitionProvider } from "../DeleteCustomerTransitionContext";
import { CustomerItemActionMenuTrigger } from "../CustomerItem/CustomerItemActionMenuTrigger";
import { UpdateCustomerTransitionProvider } from "../UpdateCustomerTransitionContext";

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
  customerDetailContainer: React.ReactNode;
  editCustomerFormContainer: React.ReactNode;
  deleteCustomer: ActionFn<ActionState, DeleteCustomersPayload>;
}

export function CustomerGridItem(props: CustomerGridItemProps) {
  const t = useTranslations("customers.CustomerGridItem");

  const selected = useSelectedItems();

  return (
    <DeleteCustomerTransitionProvider>
      <UpdateCustomerTransitionProvider>
        <CustomerItemPendingOverlay customerId={props.id}>
          <SelectableItem {...selected} item={{ id: props.id }}>
            <CustomerGridItemInner {...props} />
          </SelectableItem>
        </CustomerItemPendingOverlay>
      </UpdateCustomerTransitionProvider>
    </DeleteCustomerTransitionProvider>
  );
}

const CustomerGridItemInner = memo(
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
  }: CustomerGridItemProps) => {
    const t = useTranslations("customers.CustomerGridItem");

    const customerImg = imageUrl ? (
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
      <CustomerGridItemLayout
        topRowSlot={
          <GridItemRow>
            <CustomerItemCheckbox id={id} />
            <CustomerItemActionMenuTrigger
              customerId={id}
              customerFullName={fullName}
              editCustomerFormContainer={editCustomerFormContainer}
              className="-mr-2"
              deleteCustomer={deleteCustomer}
            />
          </GridItemRow>
        }
        imageSlot={
          <>
            {/* Show modal on desktop */}
            <ItemBaseDetailModalTrigger
              className="max-md:hidden"
              modal={customerDetailModal}
            >
              {customerImg}
            </ItemBaseDetailModalTrigger>

            {/* Show link on mobile */}
            <Link className="md:hidden" href={`/customers/${id}`}>
              {customerImg}
            </Link>
          </>
        }
        titleSlot={
          <>
            {/* Show modal on desktop */}
            <GridItemInfo className="flex-auto max-md:hidden">
              <GridItemTitleDetailModalTrigger modal={customerDetailModal}>
                {fullName}
              </GridItemTitleDetailModalTrigger>

              <GridItemText>
                {company ? company.name : t("noCompany")}
              </GridItemText>
            </GridItemInfo>

            {/* Show only text on mobile */}
            <GridItemInfo className="flex-auto md:hidden">
              <GridItemTitle>{fullName}</GridItemTitle>
              <GridItemText>
                {company ? company.name : t("noCompany")}
              </GridItemText>
            </GridItemInfo>
          </>
        }
        contactSlot={
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
