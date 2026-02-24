"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { DetailHeaderSkeleton } from "../common/DetailHeader";
import { CustomerDetailHeader } from "./CustomerDetailHeader";
import { CustomerDetailDTO } from "@/lib/data/customer/customer.dto";
import { CustomerDetail, CustomerDetailSkeleton } from "./CustomerDetail";
import { PersonDetailPresentation } from "../common/PersonDetailPresentation";

interface CustomerDetailContainerProps {
  customerId: number;
}

export function CustomerDetailContainer(props: CustomerDetailContainerProps) {
  return (
    <Suspense
      fallback={
        <PersonDetailPresentation
          personHeader={<DetailHeaderSkeleton />}
          userDetail={<CustomerDetailSkeleton />}
        />
      }
    >
      <CustomerDetailContainerInner {...props} />
    </Suspense>
  );
}

function CustomerDetailContainerInner({
  customerId,
}: CustomerDetailContainerProps) {
  const { data: customer } = useSWR<CustomerDetailDTO>(
    `/api/customers/${customerId}`,
    { suspense: true },
  );

  if (!customer) {
    throw new Error("Customer not found");
  }

  return (
    <PersonDetailPresentation
      personHeader={
        <CustomerDetailHeader
          fullName={customer.fullName}
          imageUrl={customer.imageUrl}
          companyName={customer.company?.name}
        />
      }
      userDetail={
        <CustomerDetail
          fullName={customer.fullName}
          bio={customer.bio}
          email={customer.email}
          phoneNumber={customer.phoneNumber}
          publicLink={customer.publicLink}
          company={customer.company}
        />
      }
    />
  );
}
