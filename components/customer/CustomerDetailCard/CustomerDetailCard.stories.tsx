import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { CustomerDetail } from "../CustomerDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerDetailCard } from "./CustomerDetailCard";
import { CustomerDetailSkeleton } from "../CustomerDetail";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";
import { Default as CustomerDetailStory } from "@/components/customer/CustomerDetail/CustomerDetail.stories";
import { WithoutSomeData as CustomerDetailWithoutSomeDataStory } from "@/components/customer/CustomerDetail/CustomerDetail.stories";

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
    customerHeader: (
      <DetailHeader
        title={CustomerDetailStory.args.fullName}
        image={<PersonDetailHeaderImage imageUrl="/man.jpg" alt="John Doe" />}
        subtitle={CustomerDetailStory.args.company?.name}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    customerDetail: <CustomerDetailSkeleton />,
    customerHeader: <DetailHeaderSkeleton />,
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
  },
} satisfies Story;
