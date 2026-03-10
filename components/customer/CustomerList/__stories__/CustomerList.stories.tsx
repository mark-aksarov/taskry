import { CustomerList } from "../CustomerList";
import { mockedCustomerList } from "@/mocks/customers";
import type { Meta, StoryObj } from "@storybook/react";
import { CustomerListItem } from "../../CustomerListItem";
import { CustomerItemProviders } from "../../CustomerItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerListItemStory } from "../../CustomerListItem/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteCustomerProvider } from "../../DeleteCustomerContext/__stories__";
import { withUpdateCustomerProvider } from "../../UpdateCustomerContext/__stories__";
import { withDeleteCustomersProvider } from "../../DeleteCustomersContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomerList",
  component: CustomerList,
  decorators: [
    withUpdateCustomerProvider,
    withDeleteCustomerProvider,
    withDeleteCustomersProvider,
    withViewModeProvider,
    withSelectedItemsProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedCustomerList.map((customer) => (
      <CustomerItemProviders
        key={customer.id}
        customerId={customer.id}
        updateCustomer={() => ({ status: "success" })}
        deleteCustomer={() => ({ status: "success" })}
      >
        <CustomerListItem
          key={customer.id}
          {...CustomerListItemStory.args}
          {...customer}
        />
      </CustomerItemProviders>
    )),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
