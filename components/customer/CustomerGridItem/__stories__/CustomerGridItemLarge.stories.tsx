import type { Meta, StoryObj } from "@storybook/react";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerGridItemLarge } from "../CustomerGridItemLarge";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withMockedCustomerItemWrapper } from "../../CustomerItemWrapper/__stories__";
import { withDeleteCustomersProvider } from "../../DeleteCustomersProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";

const meta = {
  title: "components/customers/CustomerGridItemLarge",
  component: CustomerGridItemLarge,
  decorators: [
    withMockedCustomerItemWrapper,
    withDeleteCustomersProvider,
    withSelectedItemsProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerGridItemLarge>;

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
