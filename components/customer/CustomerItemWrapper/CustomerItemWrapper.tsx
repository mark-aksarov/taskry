import { UpdateCustomerModal } from "../UpdateCustomerModal";
import { DeleteCustomerModal } from "../DeleteCustomerModal";
import { UpdateCustomerProvider } from "../UpdateCustomerProvider";
import { DeleteCustomerProvider } from "../DeleteCustomerProvider";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { CustomerDetailContainer } from "../CustomerDetailContainer";
import { CustomerDetailSideSheet } from "../CustomerDetailSideSheet";
import { UpdateCustomerFormContainer } from "../UpdateCustomerFormContainer";
import { ModalManagerProvider } from "@/components/common/ModalManagerContext";
import { CustomerDetailHeaderContainer } from "../CustomerDetailHeaderContainer";

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
        <UpdateCustomerProvider>
          {children}

          <CustomerDetailSideSheet
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

      <GuestModeModal />
    </ModalManagerProvider>
  );
}
