"use client";

import useSWR from "swr";
import { DetailHeaderSkeleton } from "../common/DetailHeader";
import { CustomerDetailHeader } from "./CustomerDetailHeader";
import { CustomerDetailDTO } from "@/lib/data/customer/customer.dto";
import { CustomerDetail, CustomerDetailSkeleton } from "./CustomerDetail";
import { PersonDetailPresentation } from "../common/PersonDetailPresentation";

interface CustomerDetailContainerProps {
  customerId: number;
}

export function CustomerDetailContainer({
  customerId,
}: CustomerDetailContainerProps) {
  const { data: customer } = useSWR<CustomerDetailDTO>(
    `/api/customers/${customerId}`,
  );

  //Error handling for 404 (NotFound) error. https://swr.vercel.app/docs/error-handling

  // Show skeleton while loading
  if (!customer) {
    return (
      <PersonDetailPresentation
        personHeader={<DetailHeaderSkeleton />}
        userDetail={<CustomerDetailSkeleton />}
      />
    );
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
