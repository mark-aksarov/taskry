"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { CustomerDetailDTO } from "@/lib/data/customer/customer.dto";
import { CustomerDetail, CustomerDetailSkeleton } from "./CustomerDetail";
import { PersonDetailHeaderImage } from "../common/PersonDetailHeaderImage";
import { DetailHeader, DetailHeaderSkeleton } from "../common/DetailHeader";
import { PersonDetailPresentation } from "../common/PersonDetailPresentation";

interface CustomerDetailContainerProps {
  customerId: number;
}

export function CustomerDetailContainer(props: CustomerDetailContainerProps) {
  return (
    <Suspense
      fallback={
        <PersonDetailPresentation
          personHeader={<DetailHeaderSkeleton />}
          userDetail={<CustomerDetailSkeleton />}
        />
      }
    >
      <CustomerDetailContainerInner {...props} />
    </Suspense>
  );
}

function CustomerDetailContainerInner({
  customerId,
}: CustomerDetailContainerProps) {
  const t = useTranslations("customers.CustomerDetailContainer");

  const { data: customer } = useSWR<CustomerDetailDTO>(
    `/api/customers/${customerId}`,
    { suspense: true },
  );

  if (!customer) {
    throw new Error("Customer not found");
  }

  return (
    <PersonDetailPresentation
      personHeader={
        <DetailHeader
          title={customer.fullName}
          image={
            <PersonDetailHeaderImage
              imageUrl={customer.imageUrl}
              alt={customer.fullName}
            />
          }
          subtitle={
            customer.company ? customer.company.name : t("unknownCompany")
          }
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
