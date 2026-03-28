import { MockedDeleteCustomerProvider } from "../../DeleteCustomerProvider/__stories__";
import { MockedUpdateCustomerProvider } from "../../UpdateCustomerProvider/__stories__";

export function MockedCustomerItemWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MockedDeleteCustomerProvider>
      <MockedUpdateCustomerProvider>{children}</MockedUpdateCustomerProvider>
    </MockedDeleteCustomerProvider>
  );
}
