import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerDetailModal } from "../CustomerDetailModal";
import { CustomerDetailHeader } from "../../CustomerDetailHeader";
import { CustomerDetail } from "../../CustomerDetail/CustomerDetail";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailSkeleton } from "../../CustomerDetail/CustomerDetailSkeleton";

const meta = {
  title: "components/customers/CustomerDetailModal",
  component: CustomerDetailModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Customer detail" />
          <Story />
        </DialogTrigger>
      );
    },
    withThemedBackground,
  ],
  args: {
    customerId: 1,
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
        canUpdateImage={false}
        customerId={mockedCustomerDetail.id}
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
