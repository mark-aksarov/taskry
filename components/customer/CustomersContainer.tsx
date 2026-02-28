import "server-only";

import { CustomerList } from "./CustomerList";
import { CustomerGrid } from "./CustomerGrid";
import { CustomerListItem } from "./CustomerListItem";
import { CustomerGridItem } from "./CustomerGridItem";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { CustomerDetailContainer } from "./CustomerDetailContainer";
import { CustomerListItemDTO } from "@/lib/data/customer/customer.dto";
import { EditCustomerFormContainer } from "./EditCustomerFormContainer";
import { deleteCustomers } from "@/lib/actions/customer/deleteCustomers";
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
  const getCustomerCommonProps = (customer: CustomerListItemDTO) => ({
    id: customer.id,
    fullName: customer.fullName,
    imageUrl: customer.imageUrl,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
    publicLink: customer.publicLink,
    company: customer.company,
    deleteCustomer: deleteCustomers,
  });

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      list={
        <CustomerList>
          {customers.map((customer) => (
            <CustomerListItem
              key={customer.id}
              editCustomerFormContainer={
                <EditCustomerFormContainer customerId={customer.id} />
              }
              customerDetailContainer={
                <CustomerDetailContainer customerId={customer.id} />
              }
              {...getCustomerCommonProps(customer)}
            />
          ))}
        </CustomerList>
      }
      grid={
        <CustomerGrid>
          {customers.map((customer) => (
            <CustomerGridItem
              key={customer.id}
              editCustomerFormContainer={
                <EditCustomerFormContainer customerId={customer.id} />
              }
              customerDetailContainer={
                <CustomerDetailContainer customerId={customer.id} />
              }
              {...getCustomerCommonProps(customer)}
            />
          ))}
        </CustomerGrid>
      }
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
