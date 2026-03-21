import {
  CustomerDetailActions,
  CustomerDetailActionsSkeleton,
} from "../CustomerDetailActions";

import { CustomerDetail } from "../CustomerDetail";
import { EditCustomerForm } from "../EditCustomerForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerDetailCard } from "./CustomerDetailCard";
import { CustomerDetailSkeleton } from "../CustomerDetail";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CustomerDetailHeader } from "../CustomerDetailHeader";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCustomerProvider } from "../DeleteCustomerContext/__stories__";
import { withUpdateCustomerProvider } from "../UpdateCustomerContext/__stories__";
import { withUpdateCustomerImageProvider } from "../UpdateCustomerImageContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withDeleteCustomerImageProvider } from "../DeleteCustomerImageContext/__stories__";

const meta = {
  title: "components/customers/CustomerDetailCard",
  component: CustomerDetailCard,
  decorators: [
    withUpdateCustomerImageProvider,
    withDeleteCustomerImageProvider,
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
      <CustomerDetailHeader
        canUpdateImage={true}
        customerId={mockedCustomerDetail.id}
        fullName={mockedCustomerDetail.fullName}
        imageUrl={mockedCustomerDetail.imageUrl}
        companyName={mockedCustomerDetail.company.name}
      />
    ),
    customerDetailActions: (
      <CustomerDetailActions
        customerId={mockedCustomerDetail.id}
        customerFullName={mockedCustomerDetail.fullName}
        editCustomerFormContainer={
          <EditCustomerForm
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
      <CustomerDetailHeader
        customerId={mockedCustomerDetail.id}
        fullName={mockedCustomerDetail.fullName}
        canUpdateImage={true}
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
