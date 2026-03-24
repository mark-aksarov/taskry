import type { Meta, StoryObj } from "@storybook/react";
import { mockedCustomerList } from "@/mocks/customers";
import { CustomerGridLarge } from "../CustomerGridLarge";
import { CustomerGridItemLarge } from "../../CustomerGridItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedCustomerItemProviders } from "../../CustomerItemProviders/__stories__";
import { CustomerGridItemLargeStory } from "../../CustomerGridItem/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteCustomersProvider } from "../../DeleteCustomersProvider/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomerGridLarge",
  component: CustomerGridLarge,
  decorators: [
    withDeleteCustomersProvider,
    withSelectedItemsProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerGridLarge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedCustomerList.map((customer) => (
      <MockedCustomerItemProviders key={customer.id}>
        <CustomerGridItemLarge
          key={customer.id}
          {...CustomerGridItemLargeStory.args}
          {...customer}
        />
      </MockedCustomerItemProviders>
    )),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
