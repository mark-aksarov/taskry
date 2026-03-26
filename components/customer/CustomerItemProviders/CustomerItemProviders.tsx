import { UpdateCustomerProvider } from "../UpdateCustomerProvider";
import { DeleteCustomerProvider } from "../DeleteCustomerProvider";
import { UpdateCustomerModalProvider } from "../UpdateCustomerModal";
import { CustomerDetailModalProvider } from "../CustomerDetailModal";
import { DeleteCustomerModalProvider } from "../DeleteCustomerModal";

interface CustomerItemProvidersProps {
  children: React.ReactNode;
}

export function CustomerItemProviders({
  children,
}: CustomerItemProvidersProps) {
  return (
    <CustomerDetailModalProvider>
      <DeleteCustomerModalProvider>
        <DeleteCustomerProvider>
          <UpdateCustomerModalProvider>
            <UpdateCustomerProvider>{children}</UpdateCustomerProvider>
          </UpdateCustomerModalProvider>
        </DeleteCustomerProvider>
      </DeleteCustomerModalProvider>
    </CustomerDetailModalProvider>
  );
}
