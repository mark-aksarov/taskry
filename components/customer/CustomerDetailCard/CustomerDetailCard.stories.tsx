import {
  CustomerDetailActions,
  CustomerDetailActionsSkeleton,
} from "../CustomerDetailActions";

import { CustomerDetail } from "../CustomerDetail";
import { UpdateCustomerForm } from "../UpdateCustomerForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerDetailCard } from "./CustomerDetailCard";
import { CustomerDetailSkeleton } from "../CustomerDetail";
import { mockedCompanySummaries } from "@/mocks/companies";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailHeaderInteractive } from "../CustomerDetailHeader";
import { withDeleteCustomerProvider } from "../DeleteCustomerProvider/__stories__";
import { withUpdateCustomerProvider } from "../UpdateCustomerProvider/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { MockedCustomerDetailHeaderInteractiveProviders } from "../CustomerDetailHeaderInteractiveProviders/__stories__";

const meta = {
  title: "components/customers/CustomerDetailCard",
  component: CustomerDetailCard,
  decorators: [
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
    customerDetailContainer: <CustomerDetail {...mockedCustomerDetail} />,
    customerDetailHeaderContainer: (
      <MockedCustomerDetailHeaderInteractiveProviders>
        <CustomerDetailHeaderInteractive
          customerId={mockedCustomerDetail.id}
          fullName={mockedCustomerDetail.fullName}
          imageUrl={mockedCustomerDetail.imageUrl}
          companyName={mockedCustomerDetail.company.name}
        />
      </MockedCustomerDetailHeaderInteractiveProviders>
    ),
    customerDetailActions: (
      <CustomerDetailActions
        customerId={mockedCustomerDetail.id}
        customerFullName={mockedCustomerDetail.fullName}
        updateCustomerFormContainer={
          <UpdateCustomerForm
            {...mockedCustomerDetail}
            customerId={mockedCustomerDetail.id}
            companySelectItems={mockedCompanySummaries}
          />
        }
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    customerDetailContainer: <CustomerDetailSkeleton />,
    customerDetailHeaderContainer: <DetailHeaderSkeleton />,
    customerDetailActions: <CustomerDetailActionsSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ...Default.args,
    customerDetailContainer: (
      <CustomerDetail
        fullName={mockedCustomerDetail.fullName}
        email={mockedCustomerDetail.email}
      />
    ),
    customerDetailHeaderContainer: (
      <MockedCustomerDetailHeaderInteractiveProviders>
        <CustomerDetailHeaderInteractive
          customerId={mockedCustomerDetail.id}
          fullName={mockedCustomerDetail.fullName}
        />
      </MockedCustomerDetailHeaderInteractiveProviders>
    ),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
