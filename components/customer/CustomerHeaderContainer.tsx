import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CustomerDetailHeader } from "./CustomerDetailHeader";
import { getCustomerDetail } from "@/lib/data/customer/customer.dal";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";

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
