import { useDeleteCustomers } from "../DeleteCustomersContext";
import { useDeleteCustomerTransition } from "../DeleteCustomerTransitionContext";
import { useUpdateCustomerTransition } from "../UpdateCustomerTransitionContext";

export function useCustomerItemPending(customerId: number) {
  const { isPending: isDeleteCustomerPending } = useDeleteCustomerTransition();
  const { isPending: isDeleteCustomersPending, customerIds } =
    useDeleteCustomers();
  const { isPending: isUpdateCustomerPending } = useUpdateCustomerTransition();

  const isPending =
    isDeleteCustomerPending ||
    isUpdateCustomerPending ||
    (isDeleteCustomersPending && customerIds.includes(customerId));

  return isPending;
}
