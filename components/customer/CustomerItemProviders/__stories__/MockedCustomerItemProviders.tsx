import { UpdateCustomerModalProvider } from "../../UpdateCustomerModal";
import { CustomerDetailModalProvider } from "../../CustomerDetailModal";
import { DeleteCustomerModalProvider } from "../../DeleteCustomerModal";
import { MockedDeleteCustomerProvider } from "../../DeleteCustomerProvider/__stories__";
import { MockedUpdateCustomerProvider } from "../../UpdateCustomerProvider/__stories__";

export function MockedCustomerItemProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomerDetailModalProvider>
      <DeleteCustomerModalProvider>
        <MockedDeleteCustomerProvider>
          <UpdateCustomerModalProvider>
            <MockedUpdateCustomerProvider>
              {children}
            </MockedUpdateCustomerProvider>
          </UpdateCustomerModalProvider>
        </MockedDeleteCustomerProvider>
      </DeleteCustomerModalProvider>
    </CustomerDetailModalProvider>
  );
}
