import "server-only";

import {
  CustomerGridItemLarge,
  CustomerGridItemMobile,
} from "./CustomerGridItem";

import { CustomerList } from "./CustomerList";
import { CustomerGridLarge } from "./CustomerGrid";
import { CustomerGridMobile } from "./CustomerGrid";
import { CustomerListItem } from "./CustomerListItem";
import { BaseCustomerItemProps } from "./CustomerItem";
import { CustomerProviders } from "./CustomerProviders";
import { CustomerDetailContainer } from "./CustomerDetailContainer";
import { CustomerListItemDTO } from "@/lib/data/customer/customer.dto";
import { UpdateCustomerFormContainer } from "./UpdateCustomerFormContainer";
import { CustomerDetailHeaderContainer } from "./CustomerDetailHeaderContainer";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";

export interface CustomersContainerProps {
  customers: CustomerListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export async function CustomersContainer({
  customers,
  totalCount,
  page,
  pageSize,
}: CustomersContainerProps) {
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

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      listLarge={
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
      }
      gridLarge={
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
      }
      gridMobile={
        <CustomerGridMobile>
          {customers.map((customer) => (
            <CustomerProviders key={customer.id}>
              <CustomerGridItemMobile {...getCommonProps(customer)} />
            </CustomerProviders>
          ))}
        </CustomerGridMobile>
      }
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
