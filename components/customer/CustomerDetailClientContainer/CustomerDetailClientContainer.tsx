"use client";

import useSWR from "swr";
import { CustomerDetail } from "../CustomerDetail";
import { GetCustomerDetailsType } from "@/lib/queries/customers";
import { PersonHeader } from "@/components/common/PersonHeader";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CustomerDetailClientContainerProps {
  customerId: number;
}

export function CustomerDetailClientContainer({
  customerId,
}: CustomerDetailClientContainerProps) {
  const { data: customer } = useSWR<GetCustomerDetailsType>(
    `/api/customers/${customerId}`,
    fetcher,
    { suspense: true },
  );

  if (!customer) return null;

  return (
    <div className="flex flex-col gap-6">
      <PersonHeader
        title={customer.fullName}
        imageUrl={customer.imageUrl ?? undefined}
        subtitle={customer.company ? customer.company.name : "Unknown company"}
      />
      <CustomerDetail
        fullName={customer.fullName}
        bio={customer.bio ?? undefined}
        email={customer.email}
        phoneNumber={customer.phoneNumber ?? undefined}
        publicLink={customer.publicLink ?? undefined}
        company={customer.company ?? undefined}
      />
    </div>
  );
}
