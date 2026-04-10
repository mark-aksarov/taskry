import {
  CustomerDetailAlt,
  CustomerDetailAltSkeleton,
} from "./CustomerDetailAlt";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCustomerDetail } from "@/lib/data/customer/customer.dal";

interface CustomerDetailAltContainerProps {
  customerId: number;
}

export function CustomerDetailAltContainer(
  props: CustomerDetailAltContainerProps,
) {
  return (
    <Suspense fallback={<CustomerDetailAltSkeleton />}>
      <CustomerDetailAltContainerInner {...props} />
    </Suspense>
  );
}

async function CustomerDetailAltContainerInner({
  customerId,
}: CustomerDetailAltContainerProps) {
  const customer = await getCustomerDetail(customerId);

  if (!customer) {
    notFound();
  }

  return (
    <CustomerDetailAlt
      fullName={customer.fullName}
      bio={customer.bio}
      email={customer.email}
      phoneNumber={customer.phoneNumber}
      publicLink={customer.publicLink}
      company={customer.company}
    />
  );
}
