import "server-only";

import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getCustomerDetail } from "@/lib/data/customer/customer.service";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";

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
  const t = useTranslations("customers.CustomerHeaderContainer");

  const customer = await getCustomerDetail(customerId);

  if (!customer) {
    notFound();
  }

  return (
    <DetailHeader
      title={customer.fullName}
      image={
        <PersonDetailHeaderImage
          alt={customer.fullName}
          imageUrl={customer.imageUrl}
        />
      }
      subtitle={customer.company ? customer.company.name : t("unknownCompany")}
    />
  );
}
