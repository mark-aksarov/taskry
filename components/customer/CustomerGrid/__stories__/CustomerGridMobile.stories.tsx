import type { Meta, StoryObj } from "@storybook/react";
import { mockedCustomerList } from "@/mocks/customers";
import { CustomerGridMobile } from "../CustomerGridMobile";
import { CustomerGridItemMobile } from "../../CustomerGridItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedCustomerItemProviders } from "../../CustomerItem/__stories__";
import { CustomerGridItemMobileStory } from "../../CustomerGridItem/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteCustomersProvider } from "../../DeleteCustomersContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomerGridMobile",
  component: CustomerGridMobile,
  decorators: [
    withDeleteCustomersProvider,
    withSelectedItemsProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof CustomerGridMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedCustomerList.map((customer) => (
      <MockedCustomerItemProviders key={customer.id}>
        <CustomerGridItemMobile
          key={customer.id}
          {...CustomerGridItemMobileStory.args}
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
