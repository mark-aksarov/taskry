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
import { PersonDetailHeader as PersonDetailHeaderStory } from "@/components/common/DetailHeader/DetailHeader.stories";
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
    customerHeader: <DetailHeader {...PersonDetailHeaderStory.args} />,
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
