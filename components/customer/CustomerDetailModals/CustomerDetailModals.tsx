import { UpdateCustomerModal } from "../UpdateCustomerModal";
import { DeleteCustomerModal } from "../DeleteCustomerModal";
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

      <DeleteCustomerModal
        customerId={customer.id}
        customerFullName={customer.fullName}
      />
    </>
  );
}
