import {
  Default as CustomerDetailStory,
  WithoutSomeData as CustomerDetailWithoutSomeDataStory,
} from "@/components/customer/CustomerDetail/CustomerDetail.stories";

import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import {
  CustomerDetail,
  CustomerDetailSkeleton,
} from "@/components/customer/CustomerDetail";

import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { CustomerDetailPage } from "./CustomerDetailPage";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerDetailActions } from "@/components/customer/CustomerDetailActions";
import { PersonDetailHeader as PersonDetailHeaderStory } from "@/components/common/DetailHeader/DetailHeader.stories";
import { Default as CustomerDetailActionsStory } from "@/components/customer/CustomerDetailActions/CustomerDetailActions.stories";

const meta = {
  title: "pages/CustomerDetailPage",
  component: CustomerDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/customers/1");
    mocked(useParams).mockReturnValue({
      id: "1",
    });
  },
} satisfies Meta<typeof CustomerDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerDetailContainer: <CustomerDetail {...CustomerDetailStory.args} />,
    customerHeaderContainer: <DetailHeader {...PersonDetailHeaderStory.args} />,
    customerDetailActions: (
      <CustomerDetailActions {...CustomerDetailActionsStory.args} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    customerDetailContainer: <CustomerDetailSkeleton />,
    customerHeaderContainer: <DetailHeaderSkeleton />,
    customerDetailActions: (
      <CustomerDetailActions {...CustomerDetailActionsStory.args} />
    ),
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    customerDetailContainer: (
      <CustomerDetail {...CustomerDetailWithoutSomeDataStory.args} />
    ),
    customerHeaderContainer: <DetailHeaderSkeleton />,
    customerDetailActions: (
      <CustomerDetailActions {...CustomerDetailActionsStory.args} />
    ),
  },
} satisfies Story;
