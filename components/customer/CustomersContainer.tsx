import "server-only";

import {
  CustomerGridItemLarge,
  CustomerGridItemMobile,
} from "./CustomerGridItem";
import { BaseCustomerItemProps } from "./CustomerItem";

import { CustomerList } from "./CustomerList";
import { CustomerGridLarge } from "./CustomerGrid";
import { CustomerGridMobile } from "./CustomerGrid";
import { CustomerListItem } from "./CustomerListItem";
import { CustomerDetailContainer } from "./CustomerDetailContainer";
import { deleteCustomer } from "@/lib/actions/customer/deleteCustomer";
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
    updateCustomer: updateCustomer,
    deleteCustomer: deleteCustomer,
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
            <CustomerListItem
              key={customer.id}
              {...getCommonProps(customer)}
              {...getContainerProps(customer)}
            />
          ))}
        </CustomerList>
      }
      gridLarge={
        <CustomerGridLarge>
          {customers.map((customer) => (
            <CustomerGridItemLarge
              key={customer.id}
              {...getCommonProps(customer)}
              {...getContainerProps(customer)}
            />
          ))}
        </CustomerGridLarge>
      }
      gridMobile={
        <CustomerGridMobile>
          {customers.map((customer) => (
            <CustomerGridItemMobile
              key={customer.id}
              {...getCommonProps(customer)}
            />
          ))}
        </CustomerGridMobile>
      }
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
