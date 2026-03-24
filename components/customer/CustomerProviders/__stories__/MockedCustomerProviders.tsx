import { UpdateCustomerModalProvider } from "../../UpdateCustomerModal";
import { MockedDeleteCustomerProvider } from "../../DeleteCustomerProvider/__stories__";
import { MockedUpdateCustomerProvider } from "../../UpdateCustomerProvider/__stories__";

export function MockedCustomerProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MockedDeleteCustomerProvider>
      <UpdateCustomerModalProvider>
        <MockedUpdateCustomerProvider>{children}</MockedUpdateCustomerProvider>
      </UpdateCustomerModalProvider>
    </MockedDeleteCustomerProvider>
  );
}
