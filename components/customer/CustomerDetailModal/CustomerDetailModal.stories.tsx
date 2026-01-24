import {
  PersonHeader,
  PersonHeaderSkeleton,
} from "@/components/common/PersonHeader";

import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerDetailModal } from "./CustomerDetailModal";
import { CustomerDetail } from "../CustomerDetail/CustomerDetail";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailSkeleton } from "../CustomerDetail/CustomerDetailSkeleton";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";
import { Default as CustomerDetailStory } from "../CustomerDetail/CustomerDetail.stories";
import { Default as PersonHeaderStory } from "@/components/common/PersonHeader/PersonHeader.stories";

const meta = {
  title: "components/customers/CustomerDetailModal",
  component: CustomerDetailModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="Customer detail" />
        <Story />
      </DialogTrigger>
    ),
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
    customerDetailContainer: (
      <PersonDetailPresentation
        personHeader={<PersonHeader {...PersonHeaderStory.args} />}
        userDetail={<CustomerDetail {...CustomerDetailStory.args} />}
      />
    ),
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    customerId: 1,
    customerDetailContainer: (
      <PersonDetailPresentation
        personHeader={<PersonHeaderSkeleton />}
        userDetail={<CustomerDetailSkeleton />}
      />
    ),
  },
} satisfies Story;
