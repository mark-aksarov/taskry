import { CustomerDetailModal } from "../CustomerDetailModal";
import { UpdateCustomerModal } from "../UpdateCustomerModal";
import { DeleteCustomerModal } from "../DeleteCustomerModal";
import { UpdateCustomerProvider } from "../UpdateCustomerProvider";
import { DeleteCustomerProvider } from "../DeleteCustomerProvider";
import { CustomerDetailContainer } from "../CustomerDetailContainer";
import { UpdateCustomerFormContainer } from "../UpdateCustomerFormContainer";
import { CustomerDetailHeaderContainer } from "../CustomerDetailHeaderContainer";
import { ModalManagerProvider } from "@/components/common/ModalManagerContext";

interface CustomerItemWrapperProps {
  customerId: number;
  customerFullName: string;
  children: React.ReactNode;
}

export function CustomerItemWrapper({
  customerId,
  customerFullName,
  children,
}: CustomerItemWrapperProps) {
  return (
    <ModalManagerProvider>
      <DeleteCustomerProvider>
        <UpdateCustomerProvider customerId={customerId}>
          {children}

          <CustomerDetailModal
            customerId={customerId}
            customerDetailContainer={
              <CustomerDetailContainer customerId={customerId} />
            }
            customerDetailHeaderContainer={
              <CustomerDetailHeaderContainer customerId={customerId} />
            }
          />

          <UpdateCustomerModal
            updateCustomerFormContainer={
              <UpdateCustomerFormContainer customerId={customerId} />
            }
          />

          <DeleteCustomerModal
            customerId={customerId}
            customerFullName={customerFullName}
          />
        </UpdateCustomerProvider>
      </DeleteCustomerProvider>
    </ModalManagerProvider>
  );
}
