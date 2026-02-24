import { CustomerDetail } from "../../CustomerDetail";
import type { Meta, StoryObj } from "@storybook/react";
import { CustomerListItem } from "../CustomerListItem";
import { mockedCustomerDetail } from "@/mocks/customers";
import { EditCustomerForm } from "../../EditCustomerForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { editCustomerFormArgs } from "../../EditCustomerForm/__stories__";
import { withDeleteCustomerModalProvider } from "../../DeleteCustomerModal/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/customers/CustomerListItem",
  component: CustomerListItem,
  decorators: [
    withSelectedItemsProvider,
    withDeleteCustomerModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerListItem>;

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
