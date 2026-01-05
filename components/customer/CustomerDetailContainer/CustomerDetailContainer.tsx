"use client";

import useSWR from "swr";
import { useTranslations } from "next-intl";
import { CustomerDetail } from "../CustomerDetail";
import { PersonHeader } from "@/components/common/PersonHeader";
import { CustomerDetailDTO } from "@/lib/data/customer/customer.dto";

interface CustomerDetailContainerProps {
  customerId: number;
}

export function CustomerDetailContainer({
  customerId,
}: CustomerDetailContainerProps) {
  const t = useTranslations("customers.CustomerDetailContainer");

  const { data: customer } = useSWR<CustomerDetailDTO>(
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
        bio={customer.bio}
        email={customer.email}
        phoneNumber={customer.phoneNumber}
        publicLink={customer.publicLink}
        company={customer.company}
      />
    </div>
  );
}
