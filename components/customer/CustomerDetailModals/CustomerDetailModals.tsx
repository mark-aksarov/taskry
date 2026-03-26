import { UpdateCustomerModal } from "../UpdateCustomerModal";
import { DeleteCustomerDetailModal } from "../DeleteCustomerModal";
import { UpdateCustomerFormContainer } from "../UpdateCustomerFormContainer";

interface CustomerDetailModalsProps {
  customer: {
    id: number;
    fullName: string;
  };
}

export function CustomerDetailModals({ customer }: CustomerDetailModalsProps) {
  return (
    <>
      <UpdateCustomerModal
        updateCustomerFormContainer={
          <UpdateCustomerFormContainer customerId={customer.id} />
        }
      />

      <DeleteCustomerDetailModal
        customerId={customer.id}
        customerFullName={customer.fullName}
      />
    </>
  );
}
