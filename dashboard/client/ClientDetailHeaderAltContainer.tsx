import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getClientDetail } from "@/lib/data/client/client.dal";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { ClientDetailHeaderInteractive } from "./ClientDetailHeader";

interface ClientDetailHeaderAltContainerProps {
  clientId: number;
}

export function ClientDetailHeaderAltContainer(
  props: ClientDetailHeaderAltContainerProps,
) {
  return (
    <Suspense fallback={<DetailHeaderSkeleton />}>
      <ClientDetailHeaderAltContainerInner {...props} />
    </Suspense>
  );
}

async function ClientDetailHeaderAltContainerInner({
  clientId,
}: ClientDetailHeaderAltContainerProps) {
  const client = await getClientDetail(clientId);

  if (!client) {
    notFound();
  }

  return (
    <ClientDetailHeaderInteractive
      clientId={client.id}
      fullName={client.fullName}
      imageUrl={client.imageUrl}
      companyName={client.company?.name}
    />
  );
}
