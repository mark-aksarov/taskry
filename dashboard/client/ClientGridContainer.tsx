"use client";

import dynamic from "next/dynamic";
import { ClientGrid } from "./ClientGrid";
import { UpdateClientModal } from "./UpdateClientModal";
import { DeleteClientModal } from "./DeleteClientModal";
import { ClientListItemSkeleton } from "./ClientListItem";
import { GuestModeModal } from "@/dashboard/common/GuestModeModal";
import { DeleteClientProvider } from "./DeleteClientProvider";
import { UpdateClientProvider } from "./UpdateClientProvider";
import { ModalManagerProvider } from "@/common/ModalManagerContext";
import { ClientGridItemMobileSkeleton } from "./ClientGridItem";
import { ClientDetailSideSheet } from "./ClientDetailSideSheet";
import { ClientDetailContainer } from "./ClientDetailContainer";
import { ClientListItemDTO } from "@/lib/data/client/client.dto";
import { UpdateClientFormContainer } from "./UpdateClientFormContainer";
import { ClientDetailHeaderContainer } from "./ClientDetailHeaderContainer";

export const ClientListItem = dynamic(
  () => import("./ClientListItem").then((mod) => mod.ClientListItem),
  {
    ssr: false,
    loading: () => <ClientListItemSkeleton />,
  },
);

export const ClientGridItemLarge = dynamic(
  () => import("./ClientGridItem").then((mod) => mod.ClientGridItemLarge),
  {
    ssr: false,
  },
);

export const ClientGridItemMobile = dynamic(
  () => import("./ClientGridItem").then((mod) => mod.ClientGridItemMobile),
  {
    ssr: false,
    loading: () => <ClientGridItemMobileSkeleton />,
  },
);

interface ClientGridContainerProps {
  clients: ClientListItemDTO[];
}

export function ClientGridContainer({
  clients,
}: ClientGridContainerProps) {
  return (
    <ClientGrid>
      {clients.map((client) => (
        <ModalManagerProvider key={client.id}>
          <DeleteClientProvider>
            <UpdateClientProvider>
              {/* Dynamic */}
              <ClientListItem {...client} />
              <ClientGridItemMobile {...client} />
              <ClientGridItemLarge {...client} />

              {/* Modals and side sheets */}
              <ClientDetailSideSheet
                clientId={client.id}
                clientDetailContainer={
                  <ClientDetailContainer clientId={client.id} />
                }
                clientDetailHeaderContainer={
                  <ClientDetailHeaderContainer clientId={client.id} />
                }
              />

              <UpdateClientModal
                updateClientFormContainer={
                  <UpdateClientFormContainer clientId={client.id} />
                }
              />

              <DeleteClientModal
                clientId={client.id}
                clientFullName={client.fullName}
              />
            </UpdateClientProvider>
          </DeleteClientProvider>

          <GuestModeModal />
        </ModalManagerProvider>
      ))}
    </ClientGrid>
  );
}
