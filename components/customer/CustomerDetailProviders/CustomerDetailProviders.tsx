import { UpdateCustomerProvider } from "../UpdateCustomerProvider";
import { DeleteCustomerProvider } from "../DeleteCustomerProvider";
import { UpdateCustomerModalProvider } from "../UpdateCustomerModal";
import { CustomerDetailModalProvider } from "../CustomerDetailModal";
import { DeleteCustomerModalProvider } from "../DeleteCustomerModal";

interface CustomerDetailProvidersProps {
  children: React.ReactNode;
}

export function CustomerDetailProviders({
  children,
}: CustomerDetailProvidersProps) {
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
