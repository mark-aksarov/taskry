import { CustomerDetail } from "../CustomerDetail";
import { EditCustomerForm } from "../EditCustomerForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerDetailCard } from "./CustomerDetailCard";
import { CustomerDetailSkeleton } from "../CustomerDetail";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CustomerDetailHeader } from "../CustomerDetailHeader";
import { CustomerDetailActions } from "../CustomerDetailActions";
import { CustomerImageMenuTrigger } from "../CustomerImageMenuTrigger";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedCustomerDetail as mockedCustomer } from "@/mocks/customers";
import { withDeleteCustomerProvider } from "../DeleteCustomerContext/__stories__";
import { withUpdateCustomerProvider } from "../UpdateCustomerContext/__stories__";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";
import { withUpdateCustomerImageProvider } from "../UpdateCustomerImageContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";

const meta = {
  title: "components/customers/CustomerDetailCard",
  component: CustomerDetailCard,
  decorators: [
    withUpdateCustomerImageProvider,
    withUpdateCustomerProvider,
    withDeleteCustomerProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerDetail: <CustomerDetail {...mockedCustomer} />,
    customerHeader: (
      <CustomerDetailHeader
        fullName={mockedCustomer.fullName}
        imageSlot={
          <CustomerImageMenuTrigger>
            <PersonDetailHeaderImage
              alt={mockedCustomer.fullName}
              imageUrl={mockedCustomer.imageUrl}
            />
          </CustomerImageMenuTrigger>
        }
        companyName={mockedCustomer.company?.name}
      />
    ),
    customerDetailActions: (
      <CustomerDetailActions
        customerId={mockedCustomer.id}
        customerFullName={mockedCustomer.fullName}
        editCustomerFormContainer={
          <EditCustomerForm
            {...mockedCustomer}
            customerId={mockedCustomer.id}
            customerCompanySelectItems={mockedCompanySummaries}
          />
        }
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    customerDetail: <CustomerDetailSkeleton />,
    customerHeader: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ...Default.args,
    customerDetail: (
      <CustomerDetail
        fullName={mockedCustomer.fullName}
        email={mockedCustomer.email}
      />
    ),
    customerHeader: (
      <CustomerDetailHeader
        fullName={mockedCustomer.fullName}
        imageSlot={
          <CustomerImageMenuTrigger>
            <PersonDetailHeaderImage alt={mockedCustomer.fullName} />
          </CustomerImageMenuTrigger>
        }
      />
    ),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
