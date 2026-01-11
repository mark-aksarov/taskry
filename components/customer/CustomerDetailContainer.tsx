"use client";

import useSWR from "swr";
import { useTranslations } from "next-intl";
import { CustomerDetail } from "./CustomerDetail";
import { PersonHeader } from "@/components/common/PersonHeader";
import { CustomerDetailDTO } from "@/lib/data/customer/customer.dto";
import { PersonDetailPresentation } from "../common/PersonDetailPresentation";

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

  if (!customer) {
    throw new Error("Customer not found");
  }

  return (
    <PersonDetailPresentation
      personHeader={
        <PersonHeader
          title={customer.fullName}
          imageUrl={customer.imageUrl ?? undefined}
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
