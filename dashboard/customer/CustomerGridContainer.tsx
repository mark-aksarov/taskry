"use client";

import dynamic from "next/dynamic";
import { CustomerGrid } from "./CustomerGrid";
import { UpdateCustomerModal } from "./UpdateCustomerModal";
import { DeleteCustomerModal } from "./DeleteCustomerModal";
import { CustomerListItemSkeleton } from "./CustomerListItem";
import { GuestModeModal } from "@/dashboard/common/GuestModeModal";
import { DeleteCustomerProvider } from "./DeleteCustomerProvider";
import { UpdateCustomerProvider } from "./UpdateCustomerProvider";
import { ModalManagerProvider } from "@/common/ModalManagerContext";
import { CustomerGridItemMobileSkeleton } from "./CustomerGridItem";
import { CustomerDetailSideSheet } from "./CustomerDetailSideSheet";
import { CustomerDetailContainer } from "./CustomerDetailContainer";
import { CustomerListItemDTO } from "@/lib/data/customer/customer.dto";
import { UpdateCustomerFormContainer } from "./UpdateCustomerFormContainer";
import { CustomerDetailHeaderContainer } from "./CustomerDetailHeaderContainer";

export const CustomerListItem = dynamic(
  () => import("./CustomerListItem").then((mod) => mod.CustomerListItem),
  {
    ssr: false,
    loading: () => <CustomerListItemSkeleton />,
  },
);

export const CustomerGridItemLarge = dynamic(
  () => import("./CustomerGridItem").then((mod) => mod.CustomerGridItemLarge),
  {
    ssr: false,
  },
);

export const CustomerGridItemMobile = dynamic(
  () => import("./CustomerGridItem").then((mod) => mod.CustomerGridItemMobile),
  {
    ssr: false,
    loading: () => <CustomerGridItemMobileSkeleton />,
  },
);

interface CustomerGridContainerProps {
  customers: CustomerListItemDTO[];
}

export function CustomerGridContainer({
  customers,
}: CustomerGridContainerProps) {
  return (
    <CustomerGrid>
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
    </CustomerGrid>
  );
}
