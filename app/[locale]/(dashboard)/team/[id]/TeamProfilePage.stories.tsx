import {
  Default as PersonHeaderStory,
  WithoutImageUrl as PersonHeaderWithoutImageUrlStory,
} from "@/components/common/PersonHeader/PersonHeader.stories";

import {
  Default as UserDetailStory,
  WithoutSomeData as UserDetailWithoutSomeDataStory,
} from "@/components/users/UserDetail/UserDetail.stories";

import { mocked } from "storybook/test";
import { TeamProfilePage } from "./TeamProfilePage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import {
  PersonHeader,
  PersonHeaderSkeleton,
} from "@/components/common/PersonHeader";

const userId = "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI";

const meta = {
  title: "components/pages/TeamProfilePage",
  component: TeamProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue(`/team/${userId}`);
    mocked(useParams).mockReturnValue({
      id: userId,
    });
  },
  args: {
    userId: userId,
  },
} satisfies Meta<typeof TeamProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ProfileDetailContainer: () => <UserDetail {...UserDetailStory.args} />,
    UserHeaderContainer: () => <PersonHeader {...PersonHeaderStory.args} />,
  },
} satisfies Story;

export const Loading: Story = {
  args: {
    ProfileDetailContainer: () => <UserDetailSkeleton />,
    UserHeaderContainer: () => <PersonHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData: Story = {
  args: {
    ProfileDetailContainer: () => (
      <UserDetail {...UserDetailWithoutSomeDataStory.args} />
    ),
    UserHeaderContainer: () => (
      <PersonHeader {...PersonHeaderWithoutImageUrlStory.args} />
    ),
  },
} satisfies Story;
