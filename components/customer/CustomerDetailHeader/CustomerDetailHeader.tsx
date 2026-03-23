"use client";

import {
  CustomerDetailHeaderLayout,
  CustomerDetailHeaderLayoutProps,
} from "./CustomerDetailHeaderLayout";

import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";

interface CustomerDetailHeaderProps
  extends Omit<CustomerDetailHeaderLayoutProps, "imageSlot"> {
  fullName: string;
  imageUrl?: string;
  companyName?: string;
}

export function CustomerDetailHeader({
  fullName,
  imageUrl,
  companyName,
}: CustomerDetailHeaderProps) {
  return (
    <CustomerDetailHeaderLayout
      fullName={fullName}
      imageSlot={<PersonDetailHeaderImage alt={fullName} imageUrl={imageUrl} />}
      companyName={companyName}
    />
  );
}
