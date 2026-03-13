import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CustomerImageModal } from "./CustomerImageModal";
import { CustomerDetailHeader } from "./CustomerDetailHeader";
import { getCustomerDetail } from "@/lib/data/customer/customer.dal";
import { CustomerImageMenuTrigger } from "./CustomerImageMenuTrigger";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { createPresignedUrl } from "@/lib/actions/s3/createPresignedUrl";
import { UpdateCustomerImageProvider } from "./UpdateCustomerImageContext";
import { PersonDetailHeaderImage } from "../common/PersonDetailHeaderImage";
import { updateCustomerImageUrl } from "@/lib/actions/customer/updateCustomerImageUrl";

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
      imageSlot={
        <UpdateCustomerImageProvider
          createPresignedUrl={createPresignedUrl}
          updateCustomerImageUrl={updateCustomerImageUrl}
        >
          <CustomerImageMenuTrigger>
            <PersonDetailHeaderImage
              alt={customer.fullName}
              imageUrl={customer.imageUrl}
            />
          </CustomerImageMenuTrigger>

          <CustomerImageModal customerId={customerId} />
        </UpdateCustomerImageProvider>
      }
      companyName={customer.company?.name}
    />
  );
}
