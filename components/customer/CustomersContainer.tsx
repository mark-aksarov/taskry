import "server-only";

import { CustomerFilters } from "@/lib/types";
import { CustomerList } from "./CustomerList";
import { CustomerGrid } from "./CustomerGrid";
import { CustomerListItem } from "./CustomerListItem";
import { CustomerGridItem } from "./CustomerGridItem";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { CustomerDetailModal } from "./CustomerDetailModal";
import { getCustomerList } from "@/lib/data/customer/customer.dal";
import { CustomerDetailContainer } from "./CustomerDetailContainer";
import { CustomerListItemDTO } from "@/lib/data/customer/customer.dto";
import { CustomerDetailBottomSheet } from "./CustomerDetailBottomSheet";
import { EditCustomerFormContainer } from "./EditCustomerFormContainer";
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
  const { items: customers, totalCount } = await getCustomerList({
    page,
    pageSize,
    sort,
    filters,
  });

  const getCustomerCommonProps = (customer: CustomerListItemDTO) => ({
    id: customer.id,
    fullName: customer.fullName,
    imageUrl: customer.imageUrl,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
    publicLink: customer.publicLink,
    company: customer.company,
  });

  const guestMode = await hasGuestRole();

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      list={
        <CustomerList>
          {customers.map((customer) => (
            <CustomerListItem
              key={customer.id}
              menuTrigger={
                <CustomerItemActionMenuTrigger
                  guestMode={guestMode}
                  customerId={customer.id}
                  customerFullName={customer.fullName}
                  deleteAction={deleteCustomers}
                  editCustomerFormContainer={
                    <EditCustomerFormContainer customerId={customer.id} />
                  }
                />
              }
              customerDetailModal={
                <CustomerDetailModal
                  customerId={customer.id}
                  customerDetailContainer={
                    <CustomerDetailContainer customerId={customer.id} />
                  }
                />
              }
              customerDetailBottomSheet={
                <CustomerDetailBottomSheet
                  customerId={customer.id}
                  customerDetailContainer={
                    <CustomerDetailContainer customerId={customer.id} />
                  }
                />
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
              menuTrigger={
                <CustomerItemActionMenuTrigger
                  guestMode={guestMode}
                  customerId={customer.id}
                  customerFullName={customer.fullName}
                  deleteAction={deleteCustomers}
                  editCustomerFormContainer={
                    <EditCustomerFormContainer customerId={customer.id} />
                  }
                  className="-mr-2"
                />
              }
              customerDetailModal={
                <CustomerDetailModal
                  customerId={customer.id}
                  customerDetailContainer={
                    <CustomerDetailContainer customerId={customer.id} />
                  }
                />
              }
              customerDetailBottomSheet={
                <CustomerDetailBottomSheet
                  customerId={customer.id}
                  customerDetailContainer={
                    <CustomerDetailContainer customerId={customer.id} />
                  }
                />
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
