import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { CustomerDetail } from "../CustomerDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerDetailCard } from "./CustomerDetailCard";
import { CustomerDetailSkeleton } from "../CustomerDetail";
import { CustomerDetailActions } from "../CustomerDetailActions";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";
import { CustomerDetailStory } from "@/components/customer/CustomerDetail/__stories__";
import { PersonDetailHeaderStory } from "@/components/common/DetailHeader/__stories__";
import { CustomerDetailActionsStory } from "@/components/customer/CustomerDetailActions/__stories__";
import { CustomerDetailWithoutSomeDataStory } from "@/components/customer/CustomerDetail/__stories__";

const meta = {
  title: "components/customers/CustomerDetailCard",
  component: CustomerDetailCard,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerDetail: <CustomerDetail {...CustomerDetailStory.args} />,
    customerHeader: <DetailHeader {...PersonDetailHeaderStory.args} />,
    customerDetailActions: (
      <CustomerDetailActions {...CustomerDetailActionsStory.args} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    customerDetail: <CustomerDetailSkeleton />,
    customerHeader: <DetailHeaderSkeleton />,
    customerDetailActions: (
      <CustomerDetailActions {...CustomerDetailActionsStory.args} />
    ),
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    customerDetail: (
      <CustomerDetail {...CustomerDetailWithoutSomeDataStory.args} />
    ),
    customerHeader: (
      <DetailHeader
        title={CustomerDetailStory.args.fullName}
        image={<PersonDetailHeaderImage />}
        subtitle={CustomerDetailStory.args.company?.name}
      />
    ),
    customerDetailActions: (
      <CustomerDetailActions {...CustomerDetailActionsStory.args} />
    ),
  },
} satisfies Story;
