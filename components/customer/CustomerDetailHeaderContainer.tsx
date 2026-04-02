"use client";

import useSWR from "swr";
import { DetailHeaderSkeleton } from "../common/DetailHeader";
import { CustomerDetailHeader } from "./CustomerDetailHeader";
import { CustomerDetailDTO } from "@/lib/data/customer/customer.dto";

interface CustomerDetailHeaderContainerProps {
  customerId: number;
}

export function CustomerDetailHeaderContainer({
  customerId,
}: CustomerDetailHeaderContainerProps) {
  const { data: customer, error } = useSWR<CustomerDetailDTO>(
    `/api/customers/${customerId}`,
    {
      revalidateOnFocus: false,
    },
  );

  if (error) {
    throw new Error();
  }

  // Show skeleton while loading
  if (!customer) {
    return <DetailHeaderSkeleton />;
  }

  return (
    <CustomerDetailHeader
      fullName={customer.fullName}
      imageUrl={customer.imageUrl}
      companyName={customer.company?.name}
    />
  );
}
