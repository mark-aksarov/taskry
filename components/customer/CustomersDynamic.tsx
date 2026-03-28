"use client";

import {
  CustomerGridItemLarge,
  CustomerGridItemMobile,
} from "./CustomerGridItem";

import { CustomerList } from "./CustomerList";
import { CustomerListItem } from "./CustomerListItem";
import { CustomerItemWrapper } from "./CustomerItemWrapper";
import { CustomerGridLarge, CustomerGridMobile } from "./CustomerGrid";
import { CustomerListItemDTO } from "@/lib/data/customer/customer.dto";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";

interface CustomersDynamicProps {
  page: number;
  pageSize: number;
  totalPages: number;
  customers: CustomerListItemDTO[];
}

export function CustomersDynamic({
  page,
  pageSize,
  customers,
  totalPages,
}: CustomersDynamicProps) {
  const renderListLarge = () => (
    <CustomerList>
      {customers.map((customer) => (
        <CustomerItemWrapper
          key={customer.id}
          customerId={customer.id}
          customerFullName={customer.fullName}
        >
          <CustomerListItem {...customer} />
        </CustomerItemWrapper>
      ))}
    </CustomerList>
  );

  const renderGridLarge = () => (
    <CustomerGridLarge>
      {customers.map((customer) => (
        <CustomerItemWrapper
          key={customer.id}
          customerId={customer.id}
          customerFullName={customer.fullName}
        >
          <CustomerGridItemLarge {...customer} />
        </CustomerItemWrapper>
      ))}
    </CustomerGridLarge>
  );

  const renderGridMobile = () => (
    <CustomerGridMobile>
      {customers.map((customer) => (
        <CustomerItemWrapper
          key={customer.id}
          customerId={customer.id}
          customerFullName={customer.fullName}
        >
          <CustomerGridItemMobile {...customer} />
        </CustomerItemWrapper>
      ))}
    </CustomerGridMobile>
  );

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      listLarge={renderListLarge}
      gridLarge={renderGridLarge}
      gridMobile={renderGridMobile}
    />
  );
}
