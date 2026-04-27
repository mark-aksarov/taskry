"use client";

import dynamic from "next/dynamic";
import { GuestModeModal } from "../../common/GuestModeModal";
import { DeleteCustomerModal } from "../DeleteCustomerModal";
import { UpdateCustomerModal } from "../UpdateCustomerModal";
import { CustomerListItemSkeleton } from "../CustomerListItem";
import { DeleteCustomerProvider } from "../DeleteCustomerProvider";
import { UpdateCustomerProvider } from "../UpdateCustomerProvider";
import { CustomerDetailSideSheet } from "../CustomerDetailSideSheet";
import { CustomerDetailContainer } from "../CustomerDetailContainer";
import { CustomerGridItemMobileSkeleton } from "../CustomerGridItem";
import { ModalManagerProvider } from "@/common/ModalManagerContext";
import { CustomerListItemDTO } from "@/lib/data/customer/customer.dto";
import { UpdateCustomerFormContainer } from "../UpdateCustomerFormContainer";
import { CustomerDetailHeaderContainer } from "../CustomerDetailHeaderContainer";
import { EntityContainerPresentation } from "../../common/EntityContainerPresentation";

const CustomerListItem = dynamic(
  () => import("../CustomerListItem").then((mod) => mod.CustomerListItem),
  {
    ssr: false,
    loading: () => <CustomerListItemSkeleton />,
  },
);

const CustomerGridItemLarge = dynamic(
  () => import("../CustomerGridItem").then((mod) => mod.CustomerGridItemLarge),
  {
    ssr: false,
  },
);

const CustomerGridItemMobile = dynamic(
  () => import("../CustomerGridItem").then((mod) => mod.CustomerGridItemMobile),
  {
    ssr: false,
    loading: () => <CustomerGridItemMobileSkeleton />,
  },
);

export interface CustomersContainerProps {
  customers: CustomerListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export function CustomersContainer({
  customers,
  totalCount,
  page,
  pageSize,
}: CustomersContainerProps) {
  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      totalPages={Math.ceil(totalCount / pageSize)}
    >
      {customers.map((customer) => (
        <ModalManagerProvider key={customer.id}>
          <DeleteCustomerProvider>
            <UpdateCustomerProvider>
              {/* Dynamic */}
              <CustomerListItem {...customer} />
              <CustomerGridItemMobile {...customer} />
              <CustomerGridItemLarge {...customer} />

              {/* Modals and side sheets */}
              <CustomerDetailSideSheet
                customerId={customer.id}
                customerDetailContainer={
                  <CustomerDetailContainer customerId={customer.id} />
                }
                customerDetailHeaderContainer={
                  <CustomerDetailHeaderContainer customerId={customer.id} />
                }
              />

              <UpdateCustomerModal
                updateCustomerFormContainer={
                  <UpdateCustomerFormContainer customerId={customer.id} />
                }
              />

              <DeleteCustomerModal
                customerId={customer.id}
                customerFullName={customer.fullName}
              />
            </UpdateCustomerProvider>
          </DeleteCustomerProvider>

          <GuestModeModal />
        </ModalManagerProvider>
      ))}
    </EntityContainerPresentation>
  );
}
