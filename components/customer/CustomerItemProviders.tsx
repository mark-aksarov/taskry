import { ActionFn, ActionState } from "@/lib/actions/types";
import { UpdateCustomerProvider } from "./UpdateCustomerProvider";
import { DeleteCustomerProvider } from "./DeleteCustomerProvider";

interface CustomerItemProvidersProps {
  updateCustomer: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function CustomerItemProviders({
  updateCustomer,
  children,
}: CustomerItemProvidersProps) {
  return (
    <DeleteCustomerProvider>
      <UpdateCustomerProvider updateCustomer={updateCustomer}>
        {children}
      </UpdateCustomerProvider>
    </DeleteCustomerProvider>
  );
}
