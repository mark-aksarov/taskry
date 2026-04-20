import {
  CustomerGridItemLarge,
  CustomerGridItemMobile,
} from "../../CustomerGridItem";

import { mockedCustomerList } from "@/mocks/customers";
import { CustomerListItem } from "../../CustomerListItem";
import { MockedDeleteCustomerProvider } from "../../DeleteCustomerProvider/__stories__";
import { MockedUpdateCustomerProvider } from "../../UpdateCustomerProvider/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";

export function CustomersContainerPresentationExample() {
  return (
    <EntityContainerPresentation page={1} pageSize={10} totalPages={3}>
      {mockedCustomerList.map((customer) => (
        <MockedDeleteCustomerProvider key={customer.id}>
          <MockedUpdateCustomerProvider>
            <CustomerListItem {...customer} />
            <CustomerGridItemMobile {...customer} />
            <CustomerGridItemLarge {...customer} />
          </MockedUpdateCustomerProvider>
        </MockedDeleteCustomerProvider>
      ))}
    </EntityContainerPresentation>
  );
}
