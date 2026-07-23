import {
  ClientDetailAlt,
  ClientDetailAltSkeleton,
} from "./ClientDetailAlt";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getClientDetail } from "@/lib/data/client/client.dal";

interface ClientDetailAltContainerProps {
  clientId: number;
}

export function ClientDetailAltContainer(
  props: ClientDetailAltContainerProps,
) {
  return (
    <Suspense fallback={<ClientDetailAltSkeleton />}>
      <ClientDetailAltContainerInner {...props} />
    </Suspense>
  );
}

async function ClientDetailAltContainerInner({
  clientId,
}: ClientDetailAltContainerProps) {
  const client = await getClientDetail(clientId);

  if (!client) {
    notFound();
  }

  return (
    <ClientDetailAlt
      fullName={client.fullName}
      bio={client.bio}
      email={client.email}
      phoneNumber={client.phoneNumber}
      publicLink={client.publicLink}
      company={client.company}
    />
  );
}
