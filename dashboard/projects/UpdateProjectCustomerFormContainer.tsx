"use client";

import {
  UpdateProjectCustomerForm,
  UpdateProjectCustomerFormSkeleton,
} from "./UpdateProjectCustomerForm";

import useSWR from "swr";
import { CustomerSummaryDTO } from "@/lib/data/customer/customer.dto";

interface UpdateProjectCustomerFormContainerProps {
  projectId: number;
  customerId?: number;
}

export function UpdateProjectCustomerFormContainer({
  projectId,
  customerId,
}: UpdateProjectCustomerFormContainerProps) {
  const { data: customers } = useSWR<CustomerSummaryDTO[]>("/api/customers");

  // Show skeleton while loading
  if (!customers) {
    return <UpdateProjectCustomerFormSkeleton />;
  }

  return (
    <UpdateProjectCustomerForm
      projectId={projectId}
      customerId={customerId}
      customerSelectItems={customers}
    />
  );
}
