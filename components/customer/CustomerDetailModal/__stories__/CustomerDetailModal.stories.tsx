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
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";

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

const customer = mockedCustomerDetail;

export const Default = {
  args: {
    customerId: 1,
    customerDetailContainer: (
      <PersonDetailPresentation
        personHeader={
          <CustomerDetailHeader
            fullName={customer.fullName}
            imageSlot={
              <PersonDetailHeaderImage
                alt={customer.fullName}
                imageUrl={customer.imageUrl}
              />
            }
            companyName={customer.company?.name}
          />
        }
        userDetail={<CustomerDetail {...customer} />}
      />
    ),
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    customerId: 1,
    customerDetailContainer: (
      <PersonDetailPresentation
        personHeader={<DetailHeaderSkeleton />}
        userDetail={<CustomerDetailSkeleton />}
      />
    ),
  },
} satisfies Story;
