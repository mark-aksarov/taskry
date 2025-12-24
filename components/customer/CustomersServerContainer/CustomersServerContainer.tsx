import {
  getCustomerCount,
  getCustomerList,
} from "@/lib/data/customer/customer.dal";

import { CustomerList } from "../CustomerList";
import { CustomerGrid } from "../CustomerGrid";
import { CustomerListItem } from "../CustomerListItem";
import { CustomerGridItem } from "../CustomerGridItem";
import { Pagination } from "@/components/common/Pagination";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { CustomerListItemDTO } from "@/lib/data/customer/customer.dto";
import { deleteCustomers } from "@/lib/actions/company/deleteCustomers";

interface CustomersServerContainerProps {
  page: number;
  pageSize: number;
}

export async function CustomersServerContainer({
  page,
  pageSize,
}: CustomersServerContainerProps) {
  const customers = await getCustomerList({ page, pageSize });
  const count = await getCustomerCount();
  const totalPages = Math.ceil(count / pageSize);

  const paginationProps = {
    page,
    totalPages,
    pageSize,
    baseUrl: "/customers",
  };

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
    <>
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

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            {...paginationProps}
            size="large"
            className="max-md:hidden"
          />
          <Pagination {...paginationProps} className="md:hidden" />
        </div>
      )}
    </>
  );
}
