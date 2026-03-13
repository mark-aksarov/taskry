import { CustomerDetail } from "../../CustomerDetail";
import type { Meta, StoryObj } from "@storybook/react";
import { CustomerListItem } from "../CustomerListItem";
import { EditCustomerForm } from "../../EditCustomerForm";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CustomerDetailHeader } from "../../CustomerDetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedCustomerDetail as mockedCustomer } from "@/mocks/customers";
import { withCustomerItemProviders } from "../../CustomerItem/__stories__";
import { withDeleteCustomersProvider } from "../../DeleteCustomersContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/customers/CustomerListItem",
  component: CustomerListItem,
  decorators: [
    withCustomerItemProviders,
    withDeleteCustomersProvider,
    withSelectedItemsProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedCustomer,
    customerDetailContainer: <CustomerDetail {...mockedCustomer} />,
    customerDetailHeaderContainer: (
      <CustomerDetailHeader
        canUpdateImage={false}
        fullName={mockedCustomer.fullName}
        imageUrl={mockedCustomer.imageUrl}
        companyName={mockedCustomer.company.name}
      />
    ),
    editCustomerFormContainer: (
      <EditCustomerForm
        {...mockedCustomer}
        customerId={mockedCustomer.id}
        companySelectItems={mockedCompanySummaries}
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
    customerDetailHeaderContainer: Default.args.customerDetailHeaderContainer,
    editCustomerFormContainer: Default.args.editCustomerFormContainer,
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
