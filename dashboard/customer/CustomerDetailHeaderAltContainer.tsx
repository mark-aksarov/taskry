import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCustomerDetail } from "@/lib/data/customer/customer.dal";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { CustomerDetailHeaderInteractive } from "./CustomerDetailHeader";

interface CustomerDetailHeaderAltContainerProps {
  customerId: number;
}

export function CustomerDetailHeaderAltContainer(
  props: CustomerDetailHeaderAltContainerProps,
) {
  return (
    <Suspense fallback={<DetailHeaderSkeleton />}>
      <CustomerDetailHeaderAltContainerInner {...props} />
    </Suspense>
  );
}

async function CustomerDetailHeaderAltContainerInner({
  customerId,
}: CustomerDetailHeaderAltContainerProps) {
  const customer = await getCustomerDetail(customerId);

  if (!customer) {
    notFound();
  }

  return (
    <CustomerDetailHeaderInteractive
      fullName={customer.fullName}
      imageUrl={customer.imageUrl}
      companyName={customer.company?.name}
    />
  );
}
