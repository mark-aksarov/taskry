import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCustomerDetail } from "@/lib/data/customer/customer.service";
import { CustomerDetail, CustomerDetailSkeleton } from "./CustomerDetail";

interface CustomerDetailAltContainerProps {
  customerId: number;
}

export function CustomerDetailAltContainer(
  props: CustomerDetailAltContainerProps,
) {
  return (
    <Suspense fallback={<CustomerDetailSkeleton />}>
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
    <CustomerDetail
      fullName={customer.fullName}
      bio={customer.bio}
      email={customer.email}
      phoneNumber={customer.phoneNumber}
      publicLink={customer.publicLink}
      company={customer.company}
    />
  );
}
