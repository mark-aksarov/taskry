"use client";

import {
  ClientDetailHeaderLayout,
  ClientDetailHeaderLayoutProps,
} from "./ClientDetailHeaderLayout";

import { ClientImageMenuTrigger } from "../ClientImageMenuTrigger";
import { DeleteClientImageModal } from "../DeleteClientImageModal";
import { ClearClientImageUrlProvider } from "../ClearClientImageUrlContext";
import { PersonDetailHeaderImage } from "@/dashboard/common/PersonDetailHeaderImage";

interface ClientDetailHeaderInteractiveProps
  extends Omit<ClientDetailHeaderLayoutProps, "imageSlot"> {
  clientId: number;
  fullName: string;
  imageUrl?: string;
  companyName?: string;
}

export function ClientDetailHeaderInteractive({
  clientId,
  fullName,
  imageUrl,
  companyName,
}: ClientDetailHeaderInteractiveProps) {
  return (
    <ClientDetailHeaderLayout
      fullName={fullName}
      imageSlot={
        <ClearClientImageUrlProvider>
          <ClientImageMenuTrigger showDeleteMenuItem={!!imageUrl}>
            <PersonDetailHeaderImage imageUrl={imageUrl} />
          </ClientImageMenuTrigger>

          <DeleteClientImageModal
            clientId={clientId}
            clientFullName={fullName}
          />
        </ClearClientImageUrlProvider>
      }
      companyName={companyName}
    />
  );
}
