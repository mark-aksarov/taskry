import { CustomerFilters } from "@/lib/types";
import { CustomerList } from "./CustomerList";
import { CustomerGrid } from "./CustomerGrid";
import { CustomerListItem } from "./CustomerListItem";
import { CustomerGridItem } from "./CustomerGridItem";
import { getCustomerCount } from "@/lib/data/customer/customer.dal";
import { getCustomerList } from "@/lib/data/customer/customer.service";
import { CustomerListItemDTO } from "@/lib/data/customer/customer.dto";
import { deleteCustomers } from "@/lib/actions/customer/deleteCustomers";
import { CustomerItemActionMenuTrigger } from "./CustomerItemActionMenuTrigger";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";

export interface CustomersContainerProps {
  page: number;
  pageSize: number;
  sort: string;
  filters?: CustomerFilters;
}

export async function CustomersContainer({
  page,
  pageSize,
  sort,
  filters,
}: CustomersContainerProps) {
  const customers = await getCustomerList({ page, pageSize, sort, filters });
  const count = await getCustomerCount(filters);

  const getCustomerCommonProps = (customer: CustomerListItemDTO) => ({
    id: customer.id,
    fullName: customer.fullName,
    imageUrl: customer.imageUrl,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
    publicLink: customer.publicLink,
    company: customer.company,
  });

  function renderMenuTrigger(
    customer: CustomerListItemDTO,
    className?: string,
  ) {
    return (
      <CustomerItemActionMenuTrigger
        customerId={customer.id}
        customerFullName={customer.fullName}
        deleteAction={deleteCustomers}
        className={className}
      />
    );
  }

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      list={
        <CustomerList>
          {customers.map((customer) => (
            <CustomerListItem
              key={customer.id}
              menuTrigger={renderMenuTrigger(customer)}
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
              menuTrigger={(renderMenuTrigger(customer), "-mr-2")}
              {...getCustomerCommonProps(customer)}
            />
          ))}
        </CustomerGrid>
      }
      totalPages={Math.ceil(count / pageSize)}
    />
  );
}
