import { CustomerDetailModal } from "../CustomerDetailModal";
import { UpdateCustomerModal } from "../UpdateCustomerModal";
import { DeleteCustomerModal } from "../DeleteCustomerModal";
import { CustomerDetailContainer } from "../CustomerDetailContainer";
import { UpdateCustomerFormContainer } from "../UpdateCustomerFormContainer";
import { CustomerDetailHeaderContainer } from "../CustomerDetailHeaderContainer";

interface CustomerItemModalsProps {
  customer: {
    id: number;
    fullName: string;
  };
}

export function CustomerItemModals({ customer }: CustomerItemModalsProps) {
  return (
    <>
      <CustomerDetailModal
        customerId={customer.id}
        customerDetailContainer={
          <CustomerDetailContainer customerId={customer.id} />
        }
        customerDetailHeaderContainer={
          <CustomerDetailHeaderContainer customerId={customer.id} />
        }
      />

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
