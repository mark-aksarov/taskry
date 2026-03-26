"use client";

import {
  CustomerGridItemLarge,
  CustomerGridItemMobile,
} from "./CustomerGridItem";

import { CustomerList } from "./CustomerList";
import { CustomerListItem } from "./CustomerListItem";
import { BaseCustomerItemProps } from "./CustomerItem";
import { CustomerProviders } from "./CustomerProviders";
import { CustomerDetailContainer } from "./CustomerDetailContainer";
import { CustomerGridLarge, CustomerGridMobile } from "./CustomerGrid";
import { CustomerListItemDTO } from "@/lib/data/customer/customer.dto";
import { UpdateCustomerFormContainer } from "./UpdateCustomerFormContainer";
import { CustomerDetailHeaderContainer } from "./CustomerDetailHeaderContainer";
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
  const getCommonProps = (
    customer: CustomerListItemDTO,
  ): BaseCustomerItemProps => ({
    id: customer.id,
    fullName: customer.fullName,
    imageUrl: customer.imageUrl,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
    publicLink: customer.publicLink,
    company: customer.company,
    updateCustomerFormContainer: (
      <UpdateCustomerFormContainer customerId={customer.id} />
    ),
  });

  const getContainerProps = (customer: CustomerListItemDTO) => ({
    customerDetailContainer: (
      <CustomerDetailContainer customerId={customer.id} />
    ),
    customerDetailHeaderContainer: (
      <CustomerDetailHeaderContainer customerId={customer.id} />
    ),
  });

  const renderListLarge = () => {
    return (
      <CustomerList>
        {customers.map((customer) => (
          <CustomerProviders key={customer.id}>
            <CustomerListItem
              {...getCommonProps(customer)}
              {...getContainerProps(customer)}
            />
          </CustomerProviders>
        ))}
      </CustomerList>
    );
  };

  const renderGridLarge = () => {
    return (
      <CustomerGridLarge>
        {customers.map((customer) => (
          <CustomerProviders key={customer.id}>
            <CustomerGridItemLarge
              {...getCommonProps(customer)}
              {...getContainerProps(customer)}
            />
          </CustomerProviders>
        ))}
      </CustomerGridLarge>
    );
  };

  const renderGridMobile = () => {
    return (
      <CustomerGridMobile>
        {customers.map((customer) => (
          <CustomerProviders key={customer.id}>
            <CustomerGridItemMobile {...getCommonProps(customer)} />
          </CustomerProviders>
        ))}
      </CustomerGridMobile>
    );
  };

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
