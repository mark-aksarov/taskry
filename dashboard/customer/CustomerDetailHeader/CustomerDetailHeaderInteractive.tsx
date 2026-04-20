"use client";

import {
  CustomerDetailHeaderLayout,
  CustomerDetailHeaderLayoutProps,
} from "./CustomerDetailHeaderLayout";

import { CustomerImageMenuTrigger } from "../CustomerImageMenuTrigger";
import { PersonDetailHeaderImage } from "@/dashboard/common/PersonDetailHeaderImage";

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
        <CustomerImageMenuTrigger showDeleteMenuItem={!!imageUrl}>
          <PersonDetailHeaderImage imageUrl={imageUrl} />
        </CustomerImageMenuTrigger>
      }
      companyName={companyName}
    />
  );
}
