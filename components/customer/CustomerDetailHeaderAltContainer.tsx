import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CustomerImageModal } from "./CustomerImageModal";
import { CustomerDetailHeader } from "./CustomerDetailHeader";
import { getCustomerDetail } from "@/lib/data/customer/customer.dal";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { createPresignedUrl } from "@/lib/actions/s3/createPresignedUrl";
import { UpdateCustomerImageProvider } from "./UpdateCustomerImageContext";
import { updateCustomerImageUrl } from "@/lib/actions/customer/updateCustomerImageUrl";

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
    <UpdateCustomerImageProvider
      createPresignedUrl={createPresignedUrl}
      updateCustomerImageUrl={updateCustomerImageUrl}
    >
      <CustomerDetailHeader
        canUpdateImage
        fullName={customer.fullName}
        imageUrl={customer.imageUrl}
        companyName={customer.company?.name}
      />

      <CustomerImageModal customerId={customerId} />
    </UpdateCustomerImageProvider>
  );
}
