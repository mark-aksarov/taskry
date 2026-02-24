import "server-only";

import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CustomerDetailHeader } from "./CustomerDetailHeader";
import { getCustomerDetail } from "@/lib/data/customer/customer.dal";

interface CustomerHeaderContainerProps {
  customerId: number;
}

export function CustomerHeaderContainer(props: CustomerHeaderContainerProps) {
  return (
    <Suspense fallback={<DetailHeaderSkeleton />}>
      <CustomerHeaderContainerInner {...props} />
    </Suspense>
  );
}

async function CustomerHeaderContainerInner({
  customerId,
}: CustomerHeaderContainerProps) {
  const customer = await getCustomerDetail(customerId);

  if (!customer) {
    notFound();
  }

  return (
    <CustomerDetailHeader
      fullName={customer.fullName}
      imageUrl={customer.imageUrl}
      companyName={customer.company?.name}
    />
  );
}
