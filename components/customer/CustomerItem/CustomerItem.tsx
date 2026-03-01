"use client";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import { CustomerGridItem } from "../CustomerGridItem";
import { CustomerListItem } from "../CustomerListItem";
import { useViewMode } from "@/components/common/ViewMode";
import { SelectableItem } from "@/components/common/SelectableItem";
import { CustomerItemPendingOverlay } from "./CustomerItemPendingOverlay";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { DeleteCustomerTransitionProvider } from "../DeleteCustomerTransitionContext";
import { UpdateCustomerTransitionProvider } from "../UpdateCustomerTransitionContext";

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
  deleteCustomer: ActionFn<ActionState, DeleteCustomersPayload>;
}

export function CustomerItem(props: CustomerItemProps) {
  const selected = useSelectedItems();

  const { viewMode } = useViewMode();

  return (
    <DeleteCustomerTransitionProvider>
      <UpdateCustomerTransitionProvider>
        <CustomerItemPendingOverlay customerId={props.id}>
          <SelectableItem {...selected} item={{ id: props.id }}>
            {viewMode === "grid" ? (
              <CustomerGridItem {...props} />
            ) : (
              <CustomerListItem {...props} />
            )}
          </SelectableItem>
        </CustomerItemPendingOverlay>
      </UpdateCustomerTransitionProvider>
    </DeleteCustomerTransitionProvider>
  );
}
