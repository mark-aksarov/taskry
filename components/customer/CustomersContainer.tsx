import "server-only";

import { CustomerList } from "./CustomerList";
import { CustomerGrid } from "./CustomerGrid";
import { CustomerItem } from "./CustomerItem";
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
  const items = (
    <>
      {customers.map((customer) => (
        <CustomerItem
          key={customer.id}
          id={customer.id}
          fullName={customer.fullName}
          imageUrl={customer.imageUrl}
          email={customer.email}
          phoneNumber={customer.phoneNumber}
          publicLink={customer.publicLink}
          company={customer.company}
          deleteCustomer={deleteCustomers}
          editCustomerFormContainer={
            <EditCustomerFormContainer customerId={customer.id} />
          }
          customerDetailContainer={
            <CustomerDetailContainer customerId={customer.id} />
          }
        />
      ))}
    </>
  );

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      list={<CustomerList>{items}</CustomerList>}
      grid={<CustomerGrid>{items}</CustomerGrid>}
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
