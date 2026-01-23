import { Suspense } from "react";
import { CustomerFilters } from "@/lib/types";
import { CustomerList } from "./CustomerList";
import { CustomerGrid } from "./CustomerGrid";
import { CustomerListItem } from "./CustomerListItem";
import { CustomerGridItem } from "./CustomerGridItem";
import { CustomerDetailSkeleton } from "./CustomerDetail";
import { CustomerDetailModal } from "./CustomerDetailModal";
import { PersonHeaderSkeleton } from "../common/PersonHeader";
import { CustomerFormBaseSkeleton } from "./CustomerFormBase";
import { CustomerDetailContainer } from "./CustomerDetailContainer";
import { getCustomerCount } from "@/lib/data/customer/customer.dal";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { getCustomerList } from "@/lib/data/customer/customer.service";
import { CustomerListItemDTO } from "@/lib/data/customer/customer.dto";
import { CustomerDetailBottomSheet } from "./CustomerDetailBottomSheet";
import { EditCustomerFormContainer } from "./EditCustomerFormContainer";
import { PersonDetailPresentation } from "../common/PersonDetailPresentation";
import { CustomerItemActionMenuTrigger } from "./CustomerItemActionMenuTrigger";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";

interface CustomerItemActionMenuTriggerSlotProps {
  customerId: number;
  customerFullName: string;
  className?: string;
}

function CustomerItemActionMenuTriggerSlot({
  customerId,
  customerFullName,
  className,
}: CustomerItemActionMenuTriggerSlotProps) {
  return (
    <CustomerItemActionMenuTrigger
      customerId={customerId}
      customerFullName={customerFullName}
      deleteAction={deleteProjects}
      editCustomerFormContainer={
        <Suspense fallback={<CustomerFormBaseSkeleton />}>
          <EditCustomerFormContainer customerId={customerId} />
        </Suspense>
      }
      className={className}
    />
  );
}

function CustomerDetailSlotContent({ customerId }: { customerId: number }) {
  return (
    <Suspense
      fallback={
        <PersonDetailPresentation
          personHeader={<PersonHeaderSkeleton />}
          userDetail={<CustomerDetailSkeleton />}
        />
      }
    >
      <CustomerDetailContainer customerId={customerId} />
    </Suspense>
  );
}

function CustomerDetailModalSlot({ customerId }: { customerId: number }) {
  return (
    <CustomerDetailModal
      customerId={customerId}
      customerDetailContainer={
        <CustomerDetailSlotContent customerId={customerId} />
      }
    />
  );
}

function CustomerDetailBottomSheetSlot({ customerId }: { customerId: number }) {
  return (
    <CustomerDetailBottomSheet
      customerId={customerId}
      customerDetailContainer={
        <CustomerDetailSlotContent customerId={customerId} />
      }
    />
  );
}

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
                <CustomerItemActionMenuTriggerSlot
                  customerId={customer.id}
                  customerFullName={customer.fullName}
                />
              }
              customerDetailModal={
                <CustomerDetailModalSlot customerId={customer.id} />
              }
              customerDetailBottomSheet={
                <CustomerDetailBottomSheetSlot customerId={customer.id} />
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
                <CustomerItemActionMenuTriggerSlot
                  customerId={customer.id}
                  customerFullName={customer.fullName}
                  className="-mr-2"
                />
              }
              customerDetailModal={
                <CustomerDetailModalSlot customerId={customer.id} />
              }
              customerDetailBottomSheet={
                <CustomerDetailBottomSheetSlot customerId={customer.id} />
              }
              {...getCustomerCommonProps(customer)}
            />
          ))}
        </CustomerGrid>
      }
      totalPages={Math.ceil(count / pageSize)}
    />
  );
}
