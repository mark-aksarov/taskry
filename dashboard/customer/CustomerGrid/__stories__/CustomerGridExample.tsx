import {
  CustomerGridItemLarge,
  CustomerGridItemMobile,
} from "../../CustomerGridItem";

import { mockedCustomerList } from "@/mocks/customers";
import { CustomerListItem } from "../../CustomerListItem";
import { useViewMode } from "@/dashboard/common/ViewMode";
import { EntityGrid } from "@/dashboard/common/EntityGrid";
import { MockedDeleteCustomerProvider } from "../../DeleteCustomerProvider/__stories__";
import { MockedUpdateCustomerProvider } from "../../UpdateCustomerProvider/__stories__";

export function CustomerGridExample() {
  const { viewMode } = useViewMode();

  return (
    <EntityGrid viewMode={viewMode}>
      {mockedCustomerList.map((customer) => (
        <MockedDeleteCustomerProvider key={customer.id}>
          <MockedUpdateCustomerProvider>
            <CustomerListItem {...customer} />
            <CustomerGridItemMobile {...customer} />
            <CustomerGridItemLarge {...customer} />
          </MockedUpdateCustomerProvider>
        </MockedDeleteCustomerProvider>
      ))}
    </EntityGrid>
  );
}
