import {
  ActionFn,
  ActionState,
  DeleteCustomerPayload,
} from "@/lib/actions/types";
import { DeleteCustomerProvider } from "../DeleteCustomerContext";
import { UpdateCustomerProvider } from "../UpdateCustomerContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { CustomerItemPendingOverlay } from "./CustomerItemPendingOverlay";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface CustomerItemProvidersProps {
  customerId: number;
  updateCustomer: ActionFn<ActionState, FormData>;
  deleteCustomer: ActionFn<ActionState, DeleteCustomerPayload>;
  children: React.ReactNode;
}

export function CustomerItemProviders({
  customerId,
  updateCustomer,
  deleteCustomer,
  children,
}: CustomerItemProvidersProps) {
  const selected = useSelectedItems();

  return (
    <DeleteCustomerProvider deleteCustomer={deleteCustomer}>
      <UpdateCustomerProvider updateCustomer={updateCustomer}>
        <CustomerItemPendingOverlay customerId={customerId}>
          <SelectableItem {...selected} item={{ id: customerId }}>
            {children}
          </SelectableItem>
        </CustomerItemPendingOverlay>
      </UpdateCustomerProvider>
    </DeleteCustomerProvider>
  );
}
