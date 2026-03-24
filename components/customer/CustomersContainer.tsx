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
import { CustomerItemProviders } from "./CustomerItemProviders";
import { CustomerDetailContainer } from "./CustomerDetailContainer";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { CustomerListItemDTO } from "@/lib/data/customer/customer.dto";
import { EditCustomerFormContainer } from "./EditCustomerFormContainer";
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
    editCustomerFormContainer: (
      <EditCustomerFormContainer customerId={customer.id} />
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
            <CustomerItemProviders
              key={customer.id}
              updateCustomer={updateCustomer}
            >
              <CustomerListItem
                {...getCommonProps(customer)}
                {...getContainerProps(customer)}
              />
            </CustomerItemProviders>
          ))}
        </CustomerList>
      }
      gridLarge={
        <CustomerGridLarge>
          {customers.map((customer) => (
            <CustomerItemProviders
              key={customer.id}
              updateCustomer={updateCustomer}
            >
              <CustomerGridItemLarge
                {...getCommonProps(customer)}
                {...getContainerProps(customer)}
              />
            </CustomerItemProviders>
          ))}
        </CustomerGridLarge>
      }
      gridMobile={
        <CustomerGridMobile>
          {customers.map((customer) => (
            <CustomerItemProviders
              key={customer.id}
              updateCustomer={updateCustomer}
            >
              <CustomerGridItemMobile {...getCommonProps(customer)} />
            </CustomerItemProviders>
          ))}
        </CustomerGridMobile>
      }
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
