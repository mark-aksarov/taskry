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
  GridItemTitleDetailModalTrigger,
  GridItemContactLink,
} from "@/components/common/Grid";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/components/ui/Link";
import { Link2, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/Separator";
import { CustomerDetailModal } from "../CustomerDetailModal";
import { UnknownUser } from "@/components/common/UnknownUser";
import { CustomerItemCheckbox } from "../CustomerItemCheckbox";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ImageContainer } from "@/components/common/ImageContainer";
import { ItemBaseDetailModalTrigger } from "@/components/common/ItemBase";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { CustomerItemActionMenuTrigger } from "../CustomerItemActionMenuTrigger";

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
  guestMode: boolean;
  customerDetailContainer: React.ReactNode;
  editCustomerFormContainer: React.ReactNode;
}

export function CustomerGridItem({
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
}: CustomerGridItemProps) {
  const t = useTranslations("customers.CustomerGridItem");
  const selected = useSelectedItems();

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
    <SelectableItem {...selected} item={{ id }}>
      <CustomerGridItemLayout
        topRowSlot={
          <GridItemRow>
            <CustomerItemCheckbox id={id} />
            <CustomerItemActionMenuTrigger
              guestMode={guestMode}
              customerId={id}
              customerFullName={fullName}
              editCustomerFormContainer={editCustomerFormContainer}
              className="-mr-2"
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
    </SelectableItem>
  );
}
