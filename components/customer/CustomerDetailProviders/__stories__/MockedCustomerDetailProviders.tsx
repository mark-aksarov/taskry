import { UpdateCustomerModalProvider } from "../../UpdateCustomerModal";
import { DeleteCustomerModalProvider } from "../../DeleteCustomerModal";
import { MockedDeleteCustomerProvider } from "../../DeleteCustomerProvider/__stories__";
import { MockedUpdateCustomerProvider } from "../../UpdateCustomerProvider/__stories__";

export function MockedCustomerDetailProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DeleteCustomerModalProvider>
      <MockedDeleteCustomerProvider>
        <UpdateCustomerModalProvider>
          <MockedUpdateCustomerProvider>
            {children}
          </MockedUpdateCustomerProvider>
        </UpdateCustomerModalProvider>
      </MockedDeleteCustomerProvider>
    </DeleteCustomerModalProvider>
  );
}
