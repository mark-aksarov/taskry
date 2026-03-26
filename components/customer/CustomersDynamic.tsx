"use client";

import {
  CustomerGridItemLarge,
  CustomerGridItemMobile,
} from "./CustomerGridItem";

import { CustomerList } from "./CustomerList";
import { CustomerListItem } from "./CustomerListItem";
import { CustomerItemProviders } from "./CustomerItemProviders";
import { CustomerGridLarge, CustomerGridMobile } from "./CustomerGrid";
import { CustomerListItemDTO } from "@/lib/data/customer/customer.dto";
import { BaseCustomerItemProps, CustomerItemModals } from "./CustomerItem";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";

interface CustomersDynamicProps {
  page: number;
  pageSize: number;
  totalPages: number;
  customers: CustomerListItemDTO[];
}

interface CustomerItemWrapperProps {
  customer: CustomerListItemDTO;
  renderItem: (props: BaseCustomerItemProps) => React.ReactNode;
}

function CustomerItemWrapper({
  customer,
  renderItem,
}: CustomerItemWrapperProps) {
  const commonProps: BaseCustomerItemProps = {
    id: customer.id,
    fullName: customer.fullName,
    imageUrl: customer.imageUrl,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
    publicLink: customer.publicLink,
    company: customer.company,
  };

  return (
    <CustomerItemProviders>
      {renderItem(commonProps)}
      <CustomerItemModals customer={customer} />
    </CustomerItemProviders>
  );
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
          customer={customer}
          renderItem={(props) => <CustomerListItem {...props} />}
        />
      ))}
    </CustomerList>
  );

  const renderGridLarge = () => (
    <CustomerGridLarge>
      {customers.map((customer) => (
        <CustomerItemWrapper
          key={customer.id}
          customer={customer}
          renderItem={(props) => <CustomerGridItemLarge {...props} />}
        />
      ))}
    </CustomerGridLarge>
  );

  const renderGridMobile = () => (
    <CustomerGridMobile>
      {customers.map((customer) => (
        <CustomerItemWrapper
          key={customer.id}
          customer={customer}
          renderItem={(props) => <CustomerGridItemMobile {...props} />}
        />
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
