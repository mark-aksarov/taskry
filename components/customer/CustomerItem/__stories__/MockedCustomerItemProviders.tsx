import { MockedDeleteCustomerProvider } from "../../DeleteCustomerContext/__stories__";
import { MockedUpdateCustomerProvider } from "../../UpdateCustomerContext/__stories__";

export function MockedCustomerItemProviders({
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
