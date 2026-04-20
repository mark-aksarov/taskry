"use client";

import useSWR from "swr";
import { CustomerDetailDTO } from "@/lib/data/customer/customer.dto";
import { CustomerDetail, CustomerDetailSkeleton } from "./CustomerDetail";

interface CustomerDetailContainerProps {
  customerId: number;
}

export function CustomerDetailContainer({
  customerId,
}: CustomerDetailContainerProps) {
  const { data: customer, error } = useSWR<CustomerDetailDTO>(
    `/api/customers/${customerId}`,
  );

  if (error) {
    throw new Error();
  }

  // Show skeleton while loading
  if (!customer) {
    return <CustomerDetailSkeleton />;
  }

  return (
    <CustomerDetail
      fullName={customer.fullName}
      bio={customer.bio}
      email={customer.email}
      phoneNumber={customer.phoneNumber}
      publicLink={customer.publicLink}
      company={customer.company}
    />
  );
}
