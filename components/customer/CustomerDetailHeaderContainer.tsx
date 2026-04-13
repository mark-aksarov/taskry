"use client";

import useSWR from "swr";
import { DetailHeaderSkeleton } from "../common/DetailHeader";
import { CustomerDetailDTO } from "@/lib/data/customer/customer.dto";
import { CustomerDetailHeaderInteractive } from "./CustomerDetailHeader";

interface CustomerDetailHeaderContainerProps {
  customerId: number;
}

export function CustomerDetailHeaderContainer({
  customerId,
}: CustomerDetailHeaderContainerProps) {
  const { data: customer, error } = useSWR<CustomerDetailDTO>(
    `/api/customers/${customerId}`,
  );

  if (error) {
    throw new Error();
  }

  // Show skeleton while loading
  if (!customer) {
    return <DetailHeaderSkeleton />;
  }

  return (
    <CustomerDetailHeaderInteractive
      fullName={customer.fullName}
      imageUrl={customer.imageUrl}
      companyName={customer.company?.name}
    />
  );
}
