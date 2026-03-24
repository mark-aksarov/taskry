import {
  CustomerDetail,
  CustomerDetailSkeleton,
} from "@/components/customer/CustomerDetail";

import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerDetailPage } from "./CustomerDetailPage";
import { mockedCompanySummaries } from "@/mocks/companies";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { SearchList } from "@/components/search/SearchList";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateCustomerForm } from "@/components/customer/UpdateCustomerForm";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { CustomerDetailActions } from "@/components/customer/CustomerDetailActions";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { CustomerDetailHeaderInteractive } from "@/components/customer/CustomerDetailHeader";
import { withDeleteCustomerProvider } from "@/components/customer/DeleteCustomerProvider/__stories__";
import { withUpdateCustomerProvider } from "@/components/customer/UpdateCustomerContext/__stories__";
import { MockedCustomerDetailHeaderProviders } from "@/components/customer/CustomerDetailHeader/__stories__";

const meta = {
  title: "pages/CustomerDetailPage",
  component: CustomerDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withUpdateCustomerProvider,
    withDeleteCustomerProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/customers/1");
    mocked(useParams).mockReturnValue({
      id: "1",
    });
  },
} satisfies Meta<typeof CustomerDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    searchContainer: <SearchList {...SearchListStory.args} />,
    customerDetailContainer: <CustomerDetail {...mockedCustomerDetail} />,
    customerDetailHeaderContainer: (
      <MockedCustomerDetailHeaderProviders>
        <CustomerDetailHeaderInteractive
          customerId={mockedCustomerDetail.id}
          fullName={mockedCustomerDetail.fullName}
          imageUrl={mockedCustomerDetail.imageUrl}
          companyName={mockedCustomerDetail.company.name}
        />
      </MockedCustomerDetailHeaderProviders>
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
    searchContainer: <SearchList {...SearchListStory.args} />,
    customerDetailContainer: <CustomerDetailSkeleton />,
    customerDetailHeaderContainer: <DetailHeaderSkeleton />,
    customerDetailActions: Default.args.customerDetailActions,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    searchContainer: <SearchList {...SearchListStory.args} />,
    customerDetailContainer: <CustomerDetail {...mockedCustomerDetail} />,
    customerDetailHeaderContainer: (
      <MockedCustomerDetailHeaderProviders>
        <CustomerDetailHeaderInteractive
          customerId={mockedCustomerDetail.id}
          fullName={mockedCustomerDetail.fullName}
        />
      </MockedCustomerDetailHeaderProviders>
    ),
    customerDetailActions: Default.args.customerDetailActions,
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
