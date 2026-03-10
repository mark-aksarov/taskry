import {
  CustomerDetail,
  CustomerDetailSkeleton,
} from "@/components/customer/CustomerDetail";

import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerDetailPage } from "./CustomerDetailPage";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailHeader } from "@/components/customer/CustomerDetailHeader";
import { CustomerDetailActions } from "@/components/customer/CustomerDetailActions";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { customerDetailActionsArgs } from "@/components/customer/CustomerDetailActions/__stories__";
import { withDeleteCustomerProvider } from "@/components/customer/DeleteCustomerContext/__stories__";
import { withUpdateCustomerProvider } from "@/components/customer/UpdateCustomerContext/__stories__";

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
    customerDetailContainer: <CustomerDetail {...mockedCustomerDetail} />,
    customerHeaderContainer: (
      <CustomerDetailHeader
        fullName="Customer 1"
        imageUrl="/man.jpg"
        companyName="Company 1"
      />
    ),
    customerDetailActions: (
      <CustomerDetailActions {...customerDetailActionsArgs} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    customerDetailContainer: <CustomerDetailSkeleton />,
    customerHeaderContainer: <DetailHeaderSkeleton />,
    customerDetailActions: (
      <CustomerDetailActions {...customerDetailActionsArgs} />
    ),
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    customerDetailContainer: <CustomerDetail {...mockedCustomerDetail} />,
    customerHeaderContainer: <CustomerDetailHeader fullName="Customer 1" />,
    customerDetailActions: (
      <CustomerDetailActions {...customerDetailActionsArgs} />
    ),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
