import { CustomerDetail } from "../CustomerDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerDetailCard } from "./CustomerDetailCard";
import { CustomerDetailSkeleton } from "../CustomerDetail";
import { CustomerDetailHeader } from "../CustomerDetailHeader";
import { CustomerDetailActions } from "../CustomerDetailActions";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { customerDetailActionsArgs } from "@/components/customer/CustomerDetailActions/__stories__";

const meta = {
  title: "components/customers/CustomerDetailCard",
  component: CustomerDetailCard,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const customer = mockedCustomerDetail;

export const Default = {
  args: {
    customerDetail: <CustomerDetail {...customer} />,
    customerHeader: (
      <CustomerDetailHeader
        fullName={customer.fullName}
        imageUrl={customer.imageUrl}
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
    customerHeader: <CustomerDetailHeader fullName={customer.fullName} />,
    customerDetailActions: (
      <CustomerDetailActions {...customerDetailActionsArgs} />
    ),
  },
} satisfies Story;
