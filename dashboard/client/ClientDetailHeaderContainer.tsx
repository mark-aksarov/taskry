"use client";

import useSWR from "swr";
import { DetailHeaderSkeleton } from "../common/DetailHeader";
import { ClientDetailHeader } from "./ClientDetailHeader";
import { ClientDetailDTO } from "@/lib/data/client/client.dto";

interface ClientDetailHeaderContainerProps {
  clientId: number;
}

export function ClientDetailHeaderContainer({
  clientId,
}: ClientDetailHeaderContainerProps) {
  const { data: client, error } = useSWR<ClientDetailDTO>(
    `/api/clients/${clientId}`,
  );

  if (error) {
    throw new Error();
  }

  // Show skeleton while loading
  if (!client) {
    return <DetailHeaderSkeleton />;
  }

  return (
    <ClientDetailHeader
      fullName={client.fullName}
      imageUrl={client.imageUrl}
      companyName={client.company?.name}
    />
  );
}
