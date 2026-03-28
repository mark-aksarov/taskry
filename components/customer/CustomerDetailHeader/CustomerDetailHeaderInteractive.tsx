"use client";

import {
  CustomerDetailHeaderLayout,
  CustomerDetailHeaderLayoutProps,
} from "./CustomerDetailHeaderLayout";

import { CustomerImageMenuTrigger } from "../CustomerImageMenuTrigger";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";

interface CustomerDetailHeaderInteractiveProps
  extends Omit<CustomerDetailHeaderLayoutProps, "imageSlot"> {
  fullName: string;
  imageUrl?: string;
  companyName?: string;
}

export function CustomerDetailHeaderInteractive({
  fullName,
  imageUrl,
  companyName,
}: CustomerDetailHeaderInteractiveProps) {
  return (
    <CustomerDetailHeaderLayout
      fullName={fullName}
      imageSlot={
        <CustomerImageMenuTrigger>
          <PersonDetailHeaderImage alt={fullName} imageUrl={imageUrl} />
        </CustomerImageMenuTrigger>
      }
      companyName={companyName}
    />
  );
}
