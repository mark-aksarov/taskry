import { CustomerDetail } from "../CustomerDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerDetailCard } from "./CustomerDetailCard";
import { CustomerDetailSkeleton } from "../CustomerDetail";
import { CustomerDetailHeader } from "../CustomerDetailHeader";
import { CustomerDetailActions } from "../CustomerDetailActions";
import { CustomerImageMenuTrigger } from "../CustomerImageMenuTrigger";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCustomerProvider } from "../DeleteCustomerContext/__stories__";
import { withUpdateCustomerProvider } from "../UpdateCustomerContext/__stories__";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";
import { withUpdateCustomerImageProvider } from "../UpdateCustomerImageContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { customerDetailActionsArgs } from "@/components/customer/CustomerDetailActions/__stories__";

const customer = mockedCustomerDetail;

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
    customerDetail: <CustomerDetail {...customer} />,
    customerHeader: (
      <CustomerDetailHeader
        fullName={customer.fullName}
        imageSlot={
          <CustomerImageMenuTrigger>
            <PersonDetailHeaderImage
              alt={customer.fullName}
              imageUrl={customer.imageUrl}
            />
          </CustomerImageMenuTrigger>
        }
        companyName={customer.company?.name}
      />
    ),
    customerDetailActions: (
      <CustomerDetailActions {...customerDetailActionsArgs} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    customerDetail: <CustomerDetailSkeleton />,
    customerHeader: <DetailHeaderSkeleton />,
    customerDetailActions: (
      <CustomerDetailActions {...customerDetailActionsArgs} />
    ),
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    customerDetail: (
      <CustomerDetail fullName={customer.fullName} email={customer.email} />
    ),
    customerHeader: (
      <CustomerDetailHeader
        fullName={customer.fullName}
        imageSlot={
          <CustomerImageMenuTrigger>
            <PersonDetailHeaderImage alt={customer.fullName} />
          </CustomerImageMenuTrigger>
        }
      />
    ),
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
