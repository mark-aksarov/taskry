import "server-only";

import {
  CustomerDetailHeaderInteractive,
  CustomerDetailHeaderInteractiveProviders,
} from "./CustomerDetailHeader";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCustomerDetail } from "@/lib/data/customer/customer.dal";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";

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
    <CustomerDetailHeaderInteractiveProviders>
      <CustomerDetailHeaderInteractive
        customerId={customer.id}
        fullName={customer.fullName}
        imageUrl={customer.imageUrl}
        companyName={customer.company?.name}
      />
    </CustomerDetailHeaderInteractiveProviders>
  );
}
