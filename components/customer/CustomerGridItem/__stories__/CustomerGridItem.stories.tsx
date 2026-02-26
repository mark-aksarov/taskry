import { CustomerDetail } from "../../CustomerDetail";
import { CustomerGridItem } from "../CustomerGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { mockedCustomerDetail } from "@/mocks/customers";
import { EditCustomerForm } from "../../EditCustomerForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { editCustomerFormArgs } from "../../EditCustomerForm/__stories__";
import { withDeleteCustomerModalProvider } from "../../DeleteCustomerModal/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/customers/CustomerGridItem",
  component: CustomerGridItem,
  decorators: [
    withSelectedItemsProvider,
    withDeleteCustomerModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerGridItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const customer = mockedCustomerDetail;

export const Default = {
  args: {
    ...customer,
    guestMode: false,
    customerDetailContainer: <CustomerDetail {...customer} />,
    editCustomerFormContainer: <EditCustomerForm {...editCustomerFormArgs} />,
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
    id: customer.id,
    fullName: customer.fullName,
    email: customer.email,
    guestMode: false,
    customerDetailContainer: <CustomerDetail {...customer} />,
    editCustomerFormContainer: <EditCustomerForm {...editCustomerFormArgs} />,
  },
} satisfies Story;
