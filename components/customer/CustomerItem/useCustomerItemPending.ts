import { useDeleteCustomers } from "../DeleteCustomersContext";
import { useDeleteCustomer } from "../DeleteCustomerContext";
import { useUpdateCustomer } from "../UpdateCustomerContext";

export function useCustomerItemPending(customerId: number) {
  const { isPending: isDeleteCustomerPending } = useDeleteCustomer();
  const { isPending: isDeleteCustomersPending, ids: customerIds } =
    useDeleteCustomers();
  const { isPending: isUpdateCustomerPending } = useUpdateCustomer();

  const isPending =
    isDeleteCustomerPending ||
    isUpdateCustomerPending ||
    (isDeleteCustomersPending && customerIds.includes(customerId));

  return isPending;
}
