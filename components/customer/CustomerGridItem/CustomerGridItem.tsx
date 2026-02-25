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
import { Separator } from "@/components/ui/Separator";
import { UnknownUser } from "@/components/common/UnknownUser";
import { CustomerItemCheckbox } from "../CustomerItemCheckbox";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ImageContainer } from "@/components/common/ImageContainer";
import { ItemBaseDetailModalTrigger } from "@/components/common/ItemBase";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { CustomerItemActionMenuTrigger } from "../CustomerItemActionMenuTrigger";
import { CustomerDetailModal } from "../CustomerDetailModal";

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

  const contactLinkClasses = "max-w-full overflow-hidden";

  const customerImg = imageUrl ? (
    <ImageContainer className="h-20 w-20">
      <Image src={imageUrl} alt={fullName} width={80} height={80} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-20 w-20" iconSize={48} />
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

            <GridItemText>
              {company ? company.name : t("noCompany")}
            </GridItemText>
          </GridItemInfo>
        }
        contactSlot={
          <>
            <Separator />
            <GridItemContactList>
              {phoneNumber ? (
                <Link
                  className={contactLinkClasses}
                  href={`tel:${phoneNumber}`}
                >
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
                  <GridItemContactText>
                    {t("noPhoneNumber")}
                  </GridItemContactText>
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
    </SelectableItem>
  );
}
