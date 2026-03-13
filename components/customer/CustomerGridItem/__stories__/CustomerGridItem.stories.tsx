import { CustomerDetail } from "../../CustomerDetail";
import { CustomerGridItem } from "../CustomerGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { EditCustomerForm } from "../../EditCustomerForm";
import { mockedCompanySummaries } from "@/mocks/companies";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCustomerItemProviders } from "../../CustomerItem/__stories__";
import { mockedCustomerDetail as mockedCustomer } from "@/mocks/customers";
import { withDeleteCustomersProvider } from "../../DeleteCustomersContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/customers/CustomerGridItem",
  component: CustomerGridItem,
  decorators: [
    withCustomerItemProviders,
    withDeleteCustomersProvider,
    withSelectedItemsProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerGridItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedCustomer,
    customerDetailContainer: <CustomerDetail {...mockedCustomer} />,
    editCustomerFormContainer: (
      <EditCustomerForm
        {...mockedCustomer}
        customerId={mockedCustomer.id}
        customerCompanySelectItems={mockedCompanySummaries}
      />
    ),
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
    id: mockedCustomer.id,
    fullName: mockedCustomer.fullName,
    email: mockedCustomer.email,
    customerDetailContainer: Default.args.customerDetailContainer,
    editCustomerFormContainer: Default.args.editCustomerFormContainer,
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
