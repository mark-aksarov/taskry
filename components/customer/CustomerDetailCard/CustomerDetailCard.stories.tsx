import {
  CustomerDetailActions,
  CustomerDetailActionsSkeleton,
} from "../CustomerDetailActions";

import { CustomerDetail } from "../CustomerDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerDetailCard } from "./CustomerDetailCard";
import { CustomerDetailSkeleton } from "../CustomerDetail";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailHeaderInteractive } from "../CustomerDetailHeader";
import { withDeleteCustomerProvider } from "../DeleteCustomerProvider/__stories__";
import { withUpdateCustomerProvider } from "../UpdateCustomerProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withUpdateCustomerImageProvider } from "../UpdateCustomerImageProvider/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withClearCustomerImageUrlProvider } from "../ClearCustomerImageUrlProvider/__stories__";
import { withUpdateCustomerImageFileProvider } from "../UpdateCustomerImageFileContext/__stories__";

const meta = {
  title: "components/customers/CustomerDetailCard",
  component: CustomerDetailCard,
  decorators: [
    withUpdateCustomerProvider,
    withDeleteCustomerProvider,
    withUpdateCustomerImageProvider,
    withClearCustomerImageUrlProvider,
    withUpdateCustomerImageFileProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerDetailCard>;

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
    customerDetailActions: <CustomerDetailActionsSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    customerDetailContainer: (
      <CustomerDetail
        fullName={mockedCustomerDetail.fullName}
        email={mockedCustomerDetail.email}
      />
    ),
    customerDetailHeaderContainer: (
      <CustomerDetailHeaderInteractive
        fullName={mockedCustomerDetail.fullName}
      />
    ),
    customerDetailActions: <CustomerDetailActions />,
  },
} satisfies Story;
