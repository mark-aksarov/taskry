"use client";

import {
  CustomerDetailHeaderLayout,
  CustomerDetailHeaderLayoutProps,
} from "./CustomerDetailHeaderLayout";

import {
  DeleteCustomerImageModal,
  DeleteCustomerImageModalProvider,
} from "../DeleteCustomerImageModal";

import { CustomerImageModal } from "../CustomerImageModal";
import { CustomerImageMenuTrigger } from "../CustomerImageMenuTrigger";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";

interface CustomerDetailHeaderInteractiveProps
  extends Omit<CustomerDetailHeaderLayoutProps, "imageSlot"> {
  customerId: number;
  fullName: string;
  imageUrl?: string;
  companyName?: string;
}

export function CustomerDetailHeaderInteractive({
  customerId,
  fullName,
  imageUrl,
  companyName,
}: CustomerDetailHeaderInteractiveProps) {
  return (
    <DeleteCustomerImageModalProvider>
      <CustomerDetailHeaderLayout
        fullName={fullName}
        imageSlot={
          <CustomerImageMenuTrigger>
            <PersonDetailHeaderImage alt={fullName} imageUrl={imageUrl} />
          </CustomerImageMenuTrigger>
        }
        companyName={companyName}
      />

      <CustomerImageModal customerId={customerId} />

      <DeleteCustomerImageModal
        customerId={customerId}
        customerFullName={fullName}
      />
    </DeleteCustomerImageModalProvider>
  );
}
