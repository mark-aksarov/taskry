import {
  CustomerDetail,
  CustomerDetailSkeleton,
} from "@/components/customer/CustomerDetail";

import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerDetailPage } from "./CustomerDetailPage";
import { SearchList } from "@/components/search/SearchList";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { CustomerDetailActions } from "@/components/customer/CustomerDetailActions";
import { CustomerDetailHeaderInteractive } from "@/components/customer/CustomerDetailHeader";
import { withUpdateCustomerProvider } from "@/components/customer/UpdateCustomerProvider/__stories__";
import { withDeleteCustomerProvider } from "@/components/customer/DeleteCustomerProvider/__stories__";
import { withUpdateCustomerImageProvider } from "@/components/customer/UpdateCustomerImageProvider/__stories__";
import { withClearCustomerImageUrlProvider } from "@/components/customer/ClearCustomerImageUrlProvider/__stories__";
import { withUpdateCustomerImageFileProvider } from "@/components/customer/UpdateCustomerImageFileContext/__stories__";

const meta = {
  title: "pages/CustomerDetailPage",
  component: CustomerDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withUpdateCustomerProvider,
    withDeleteCustomerProvider,
    withUpdateCustomerImageProvider,
    withClearCustomerImageUrlProvider,
    withUpdateCustomerImageFileProvider,
    SharedPageDecorator,
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
    customerDetailHeaderContainer: (
      <CustomerDetailHeaderInteractive
        fullName={mockedCustomerDetail.fullName}
        imageUrl={mockedCustomerDetail.imageUrl}
        companyName={mockedCustomerDetail.company.name}
      />
    ),
    customerDetailActions: <CustomerDetailActions />,
  },
} satisfies Story;

export const Loading = {
  args: {
    customerDetailContainer: <CustomerDetailSkeleton />,
    customerDetailHeaderContainer: <DetailHeaderSkeleton />,
    customerDetailActions: <CustomerDetailActions />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    customerDetailContainer: <CustomerDetail {...mockedCustomerDetail} />,
    customerDetailHeaderContainer: (
      <CustomerDetailHeaderInteractive
        fullName={mockedCustomerDetail.fullName}
      />
    ),
    customerDetailActions: <CustomerDetailActions />,
  },
} satisfies Story;
