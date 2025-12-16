"use client";

import useSWR from "swr";
import { useTranslations } from "next-intl";
import { CustomerDetail } from "../CustomerDetail";
import { PersonHeader } from "@/components/common/PersonHeader";
import { GetCustomerDetailsType } from "@/lib/data/customers";

interface CustomerDetailClientContainerProps {
  customerId: number;
}

export function CustomerDetailClientContainer({
  customerId,
}: CustomerDetailClientContainerProps) {
  const t = useTranslations("customers.CustomerDetailClientContainer");

  const { data: customer } = useSWR<GetCustomerDetailsType>(
    `/api/customers/${customerId}`,
    { suspense: true },
  );

  if (!customer) return null;

  return (
    <div className="flex flex-col gap-6">
      <PersonHeader
        title={customer.fullName}
        imageUrl={customer.imageUrl ?? undefined}
        subtitle={
          customer.company ? customer.company.name : t("unknownCompany")
        }
      />
      <CustomerDetail
        fullName={customer.fullName}
        bio={customer.bio ?? undefined}
        email={customer.email}
        phoneNumber={customer.phoneNumber ?? undefined}
        publicLink={customer.publicLink ?? undefined}
        company={customer.company ?? undefined}
      />
    </div>
  );
}
