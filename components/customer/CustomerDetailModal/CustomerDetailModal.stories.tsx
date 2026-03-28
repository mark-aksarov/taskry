import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerDetailModal } from "../CustomerDetailModal";
import { CustomerDetailHeader } from "../CustomerDetailHeader";
import { CustomerDetail } from "../CustomerDetail/CustomerDetail";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailSkeleton } from "../CustomerDetail/CustomerDetailSkeleton";

const meta = {
  title: "components/customers/CustomerDetailModal",
  component: CustomerDetailModal,
  decorators: [withOpenModal, withModalManagerProvider, withThemedBackground],
  args: {
    customerId: 1,
  },
  parameters: {
    modalId: "customerDetail",
  },
} satisfies Meta<typeof CustomerDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerId: 1,
    customerDetailContainer: <CustomerDetail {...mockedCustomerDetail} />,
    customerDetailHeaderContainer: (
      <CustomerDetailHeader
        fullName={mockedCustomerDetail.fullName}
        imageUrl={mockedCustomerDetail.imageUrl}
        companyName={mockedCustomerDetail.company.name}
      />
    ),
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    customerId: mockedCustomerDetail.id,
    customerDetailContainer: <CustomerDetailSkeleton />,
    customerDetailHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;
