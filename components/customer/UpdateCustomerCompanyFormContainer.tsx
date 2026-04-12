"use client";

import {
  UpdateCustomerCompanyForm,
  UpdateCustomerCompanyFormSkeleton,
} from "./UpdateCustomerCompanyForm";

import useSWR from "swr";
import { CompanySummaryDTO } from "@/lib/data/company/company.dto";

interface UpdateCustomerCompanyFormContainerProps {
  customerId: number;
  companyId?: number;
}

export function UpdateCustomerCompanyFormContainer({
  customerId,
  companyId,
}: UpdateCustomerCompanyFormContainerProps) {
  const { data: companies } = useSWR<CompanySummaryDTO[]>(`/api/companies`);

  // Show skeleton while loading
  if (!companies) {
    return <UpdateCustomerCompanyFormSkeleton />;
  }

  return (
    <UpdateCustomerCompanyForm
      customerId={customerId}
      companyId={companyId}
      companySelectItems={companies}
    />
  );
}
