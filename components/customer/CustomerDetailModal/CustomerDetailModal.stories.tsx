import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { CustomerDetailModal } from "./CustomerDetailModal";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailSkeleton } from "../CustomerDetail/CustomerDetailSkeleton";
import { GlobalContainerProvider } from "@/components/layout/GlobalContainerContext";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

const meta = {
  title: "components/customers/CustomerDetailModal",
  component: CustomerDetailModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="Customer detail" />
        <Story />
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
  args: {
    customerId: 1,
  },
} satisfies Meta<typeof CustomerDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithSkeletonContent = {
  decorators: [
    (Story) => (
      <GlobalContainerProvider
        value={{
          CustomerDetailContainer: () => (
            <PersonDetailPresentation
              personHeader={<PersonHeaderSkeleton />}
              userDetail={<CustomerDetailSkeleton />}
            />
          ),
        }}
      >
        <Story />
      </GlobalContainerProvider>
    ),
  ],
} satisfies Story;
