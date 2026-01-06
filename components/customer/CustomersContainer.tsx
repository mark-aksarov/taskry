import { CustomerFilters } from "@/lib/types";
import { CustomerList } from "./CustomerList";
import { CustomerGrid } from "./CustomerGrid";
import { CustomerListItem } from "./CustomerListItem";
import { CustomerGridItem } from "./CustomerGridItem";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { getCustomerCount } from "@/lib/data/customer/customer.dal";
import { getCustomerList } from "@/lib/data/customer/customer.service";
import { CustomerListItemDTO } from "@/lib/data/customer/customer.dto";
import { deleteCustomers } from "@/lib/actions/customer/deleteCustomers";
import { EntityPaginationProvider } from "../common/EntityContainerPagination";
import { EntityContainerPagination } from "../common/EntityContainerPagination";

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
    deleteAction: deleteCustomers,
  });

  return (
    <EntityPaginationProvider>
      <ViewModeLayout
        list={
          <CustomerList>
            {customers.map((customer) => (
              <CustomerListItem
                key={customer.id}
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
                {...getCustomerCommonProps(customer)}
              />
            ))}
          </CustomerGrid>
        }
      />

      <EntityContainerPagination
        page={page}
        totalPages={Math.ceil(count / pageSize)}
        pageSize={pageSize}
      />
    </EntityPaginationProvider>
  );
}
