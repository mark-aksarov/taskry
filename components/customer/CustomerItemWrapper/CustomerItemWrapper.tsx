import { CustomerDetailModal } from "../CustomerDetailModal";
import { UpdateCustomerModal } from "../UpdateCustomerModal";
import { DeleteCustomerModal } from "../DeleteCustomerModal";
import { UpdateCustomerProvider } from "../UpdateCustomerProvider";
import { DeleteCustomerProvider } from "../DeleteCustomerProvider";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { CustomerDetailContainer } from "../CustomerDetailContainer";
import { UpdateCustomerFormContainer } from "../UpdateCustomerFormContainer";
import { UpdateCustomerImageProvider } from "../UpdateCustomerImageProvider";
import { ModalManagerProvider } from "@/components/common/ModalManagerContext";
import { CustomerDetailHeaderContainer } from "../CustomerDetailHeaderContainer";
import { ClearCustomerImageUrlProvider } from "../ClearCustomerImageUrlProvider";
import { UpdateCustomerImageFileProvider } from "../UpdateCustomerImageFileContext";
import { UpdateCustomerImageModal } from "../UpdateCustomerImageModal";
import { DeleteCustomerImageModal } from "../DeleteCustomerImageModal";

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
          <UpdateCustomerImageFileProvider>
            <UpdateCustomerImageProvider>
              <ClearCustomerImageUrlProvider customerId={customerId}>
                {children}

                <CustomerDetailModal
                  customerDetailContainer={
                    <CustomerDetailContainer customerId={customerId} />
                  }
                  customerDetailHeaderContainer={
                    <CustomerDetailHeaderContainer customerId={customerId} />
                  }
                />

                <UpdateCustomerImageModal customerId={customerId} />

                <DeleteCustomerImageModal
                  customerId={customerId}
                  customerFullName={customerFullName}
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
              </ClearCustomerImageUrlProvider>
            </UpdateCustomerImageProvider>
          </UpdateCustomerImageFileProvider>
        </UpdateCustomerProvider>
      </DeleteCustomerProvider>

      <GuestModeModal />
    </ModalManagerProvider>
  );
}
