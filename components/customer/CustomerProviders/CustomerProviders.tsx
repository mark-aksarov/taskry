import { UpdateCustomerProvider } from "../UpdateCustomerProvider";
import { DeleteCustomerProvider } from "../DeleteCustomerProvider";
import { UpdateCustomerModalProvider } from "../UpdateCustomerModal";

interface CustomerProvidersProps {
  children: React.ReactNode;
}

export function CustomerProviders({ children }: CustomerProvidersProps) {
  return (
    <DeleteCustomerProvider>
      <UpdateCustomerModalProvider>
        <UpdateCustomerProvider>{children}</UpdateCustomerProvider>
      </UpdateCustomerModalProvider>
    </DeleteCustomerProvider>
  );
}
