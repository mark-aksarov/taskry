"use client";

import useSWR from "swr";
import { UpdateClientForm } from "./UpdateClientForm";
import { ClientFormSkeleton } from "./ClientFormSkeleton";
import { CompanyDTO } from "@/lib/data/company/company.dto";
import { ClientDTO } from "@/lib/data/client/client.dto";

interface UpdateClientFormContainerProps {
  clientId: number;
}

export function UpdateClientFormContainer({
  clientId,
}: UpdateClientFormContainerProps) {
  const { data: companies } = useSWR<CompanyDTO[]>(`/api/companies`);

  const {
    data: client,
    error: clientError,
    isValidating,
  } = useSWR<ClientDTO>(`/api/clients/${clientId}?view=edit`, {
    // disable revalidation on focus to prevent UI flicker caused by isValidating
    revalidateOnFocus: false,
  });

  if (clientError) {
    throw new Error();
  }

  // Show skeleton while loading
  // or revalidating to prevent stale data rendering
  const showSkeleton = !companies || !client || isValidating;

  if (showSkeleton) {
    return <ClientFormSkeleton />;
  }

  return (
    <UpdateClientForm
      clientId={clientId}
      fullName={client.fullName}
      bio={client.bio}
      email={client.email}
      phoneNumber={client.phoneNumber}
      publicLink={client.publicLink}
      companyId={client?.companyId}
      companySelectItems={companies}
    />
  );
}
