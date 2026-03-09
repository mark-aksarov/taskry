import { CustomerGrid } from "../CustomerGrid";
import type { Meta, StoryObj } from "@storybook/react";
import { mockedCustomerList } from "@/mocks/customers";
import { CustomerGridItem } from "../../CustomerGridItem";
import { CustomerItemProviders } from "../../CustomerItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerGridItemStory } from "../../CustomerGridItem/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteCustomersProvider } from "../../DeleteCustomersContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomerGrid",
  component: CustomerGrid,
  decorators: [
    withViewModeProvider,
    withDeleteCustomersProvider,
    withSelectedItemsProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerGrid>;

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
        <CustomerGridItem
          key={customer.id}
          {...CustomerGridItemStory.args}
          {...customer}
        />
      </CustomerItemProviders>
    )),
  },
} satisfies Story;
