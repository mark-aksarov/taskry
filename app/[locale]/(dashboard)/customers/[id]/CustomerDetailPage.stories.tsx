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
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";

const meta = {
  title: "components/pages/CustomerDetailPage",
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
    customerHeaderContainer: (
      <DetailHeader
        title={CustomerDetailStory.args.fullName}
        image={<PersonDetailHeaderImage imageUrl="/man.jpg" alt="John Doe" />}
        subtitle={CustomerDetailStory.args.company.name}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    customerDetailContainer: <CustomerDetailSkeleton />,
    customerHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    customerDetailContainer: (
      <CustomerDetail {...CustomerDetailWithoutSomeDataStory.args} />
    ),
    customerHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;
