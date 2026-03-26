import type { Meta, StoryObj } from "@storybook/react";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerGridItemMobile } from "../CustomerGridItemMobile";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedCustomerItemModals } from "../../CustomerItem/__stories__";
import { withCustomerItemProviders } from "../../CustomerItemProviders/__stories__";
import { withDeleteCustomersProvider } from "../../DeleteCustomersProvider/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/customers/CustomerGridItemMobile",
  component: CustomerGridItemMobile,
  decorators: [
    (Story) => (
      <>
        <Story />
        <MockedCustomerItemModals />
      </>
    ),

    withCustomerItemProviders,
    withDeleteCustomersProvider,
    withSelectedItemsProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof CustomerGridItemMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedCustomerDetail,
  },
} satisfies Story;

export const WithOverflowContent = {
  args: {
    ...Default.args,
    fullName:
      "This is a customer name with a very long text for layout testing",
    email: "longemailaddressfortestingpurposes@exampledomainfortestemail.com",
    phoneNumber: "+1000000000000000000000000000000000000000000000000000",
    publicLink:
      "https://example.com/this-is-a-very-long-url-for-layout-testing",
  },
};

export const WithoutImagePhoneAndLink = {
  args: {
    id: mockedCustomerDetail.id,
    fullName: mockedCustomerDetail.fullName,
    email: mockedCustomerDetail.email,
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
