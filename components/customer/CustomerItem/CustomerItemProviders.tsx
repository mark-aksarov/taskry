import {
  ActionFn,
  ActionState,
  DeleteCustomerPayload,
} from "@/lib/actions/types";
import { DeleteCustomerProvider } from "../DeleteCustomerContext";
import { UpdateCustomerProvider } from "../UpdateCustomerContext";
import { CustomerItemPendingOverlay } from "./CustomerItemPendingOverlay";

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
  return (
    <DeleteCustomerProvider deleteCustomer={deleteCustomer}>
      <UpdateCustomerProvider updateCustomer={updateCustomer}>
        <CustomerItemPendingOverlay customerId={customerId}>
          {children}
        </CustomerItemPendingOverlay>
      </UpdateCustomerProvider>
    </DeleteCustomerProvider>
  );
}
