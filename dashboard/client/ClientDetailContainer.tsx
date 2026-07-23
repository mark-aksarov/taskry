"use client";

import useSWR from "swr";
import { ClientDetailDTO } from "@/lib/data/client/client.dto";
import { ClientDetail, ClientDetailSkeleton } from "./ClientDetail";

interface ClientDetailContainerProps {
  clientId: number;
}

export function ClientDetailContainer({
  clientId,
}: ClientDetailContainerProps) {
  const { data: client, error } = useSWR<ClientDetailDTO>(
    `/api/clients/${clientId}`,
  );

  if (error) {
    throw new Error();
  }

  // Show skeleton while loading
  if (!client) {
    return <ClientDetailSkeleton />;
  }

  return (
    <ClientDetail
      fullName={client.fullName}
      bio={client.bio}
      email={client.email}
      phoneNumber={client.phoneNumber}
      publicLink={client.publicLink}
      company={client.company}
    />
  );
}
