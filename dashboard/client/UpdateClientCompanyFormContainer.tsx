"use client";

import {
  UpdateClientCompanyForm,
  UpdateClientCompanyFormSkeleton,
} from "./UpdateClientCompanyForm";

import useSWR from "swr";
import { CompanyDTO } from "@/lib/data/company/company.dto";

interface UpdateClientCompanyFormContainerProps {
  clientId: number;
  companyId?: number;
}

export function UpdateClientCompanyFormContainer({
  clientId,
  companyId,
}: UpdateClientCompanyFormContainerProps) {
  const { data: companies } = useSWR<CompanyDTO[]>(`/api/companies`);

  // Show skeleton while loading
  if (!companies) {
    return <UpdateClientCompanyFormSkeleton />;
  }

  return (
    <UpdateClientCompanyForm
      clientId={clientId}
      companyId={companyId}
      companySelectItems={companies}
    />
  );
}
