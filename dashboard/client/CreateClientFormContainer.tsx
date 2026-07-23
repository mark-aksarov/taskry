import "server-only";

import { Suspense } from "react";
import { CreateClientForm } from "./CreateClientForm";
import { ClientFormSkeleton } from "./ClientFormSkeleton";
import { getCompanies } from "@/lib/data/company/company.dal";

export function CreateClientFormContainer() {
  return (
    <Suspense fallback={<ClientFormSkeleton />}>
      <CreateClientFormContainerInner />
    </Suspense>
  );
}

async function CreateClientFormContainerInner() {
  const companies = await getCompanies();

  return <CreateClientForm companySelectItems={companies} />;
}
