import { UpdateCustomerModal } from "../UpdateCustomerModal";
import { DeleteCustomerModal } from "../DeleteCustomerModal";
import { UpdateCustomerFormContainer } from "../UpdateCustomerFormContainer";

interface CustomerItemModalsProps {
  customer: {
    id: number;
    fullName: string;
  };
}

export function CustomerItemModals({ customer }: CustomerItemModalsProps) {
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
