"use client";

import {
  CustomerDetailHeaderLayout,
  CustomerDetailHeaderLayoutProps,
} from "./CustomerDetailHeaderLayout";

import { PersonDetailHeaderImage } from "@/dashboard/common/PersonDetailHeaderImage";

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
      imageSlot={<PersonDetailHeaderImage imageUrl={imageUrl} />}
      companyName={companyName}
    />
  );
}
