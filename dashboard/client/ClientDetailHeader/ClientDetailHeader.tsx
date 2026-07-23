"use client";

import {
  ClientDetailHeaderLayout,
  ClientDetailHeaderLayoutProps,
} from "./ClientDetailHeaderLayout";

import { PersonDetailHeaderImage } from "@/dashboard/common/PersonDetailHeaderImage";

interface ClientDetailHeaderProps
  extends Omit<ClientDetailHeaderLayoutProps, "imageSlot"> {
  fullName: string;
  imageUrl?: string;
  companyName?: string;
}

export function ClientDetailHeader({
  fullName,
  imageUrl,
  companyName,
}: ClientDetailHeaderProps) {
  return (
    <ClientDetailHeaderLayout
      fullName={fullName}
      imageSlot={<PersonDetailHeaderImage imageUrl={imageUrl} />}
      companyName={companyName}
    />
  );
}
