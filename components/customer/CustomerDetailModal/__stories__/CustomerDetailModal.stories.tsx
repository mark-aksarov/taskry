import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { CustomerDetailModal } from "../CustomerDetailModal";
import { CustomerDetailHeader } from "../../CustomerDetailHeader";
import { withCustomerDetailModal } from "./withCustomerDetailModal";
import { CustomerDetail } from "../../CustomerDetail/CustomerDetail";
import { useCustomerDetailModal } from "../CustomerDetailModalContext";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailSkeleton } from "../../CustomerDetail/CustomerDetailSkeleton";

const meta = {
  title: "components/customers/CustomerDetailModal",
  component: CustomerDetailModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useCustomerDetailModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withCustomerDetailModal,
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
