"use client";

import {
  ActionFn,
  ActionState,
  DeleteCustomerPayload,
} from "@/lib/actions/types";

import { CustomerGridItem } from "../CustomerGridItem";
import { CustomerListItem } from "../CustomerListItem";
import { useViewMode } from "@/components/common/ViewMode";
import { CustomerItemProviders } from "./CustomerItemProviders";

export interface CustomerItemProps {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  imageUrl?: string;
  company?: {
    id: number;
    name: string;
  };
  customerDetailContainer: React.ReactNode;
  editCustomerFormContainer: React.ReactNode;
  updateCustomer: ActionFn<ActionState, FormData>;
  deleteCustomer: ActionFn<ActionState, DeleteCustomerPayload>;
}

export function CustomerItem({
  updateCustomer,
  deleteCustomer,
  ...props
}: CustomerItemProps) {
  const { viewMode } = useViewMode();

  return (
    <CustomerItemProviders
      customerId={props.id}
      updateCustomer={updateCustomer}
      deleteCustomer={deleteCustomer}
    >
      {viewMode === "grid" ? (
        <CustomerGridItem {...props} />
      ) : (
        <CustomerListItem {...props} />
      )}
    </CustomerItemProviders>
  );
}
