"use client";

import {
  ClientDetailHeaderLayout,
  ClientDetailHeaderLayoutProps,
} from "./ClientDetailHeaderLayout";

import { ClientImageMenuTrigger } from "../ClientImageMenuTrigger";
import { PersonDetailHeaderImage } from "@/dashboard/common/PersonDetailHeaderImage";

interface ClientDetailHeaderInteractiveProps
  extends Omit<ClientDetailHeaderLayoutProps, "imageSlot"> {
  fullName: string;
  imageUrl?: string;
  companyName?: string;
}

export function ClientDetailHeaderInteractive({
  fullName,
  imageUrl,
  companyName,
}: ClientDetailHeaderInteractiveProps) {
  return (
    <ClientDetailHeaderLayout
      fullName={fullName}
      imageSlot={
        <ClientImageMenuTrigger showDeleteMenuItem={!!imageUrl}>
          <PersonDetailHeaderImage imageUrl={imageUrl} />
        </ClientImageMenuTrigger>
      }
      companyName={companyName}
    />
  );
}
