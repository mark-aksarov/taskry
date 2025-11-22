import {
  Default as UserHeaderStory,
  WithoutSomeData as UserHeaderWithoutSomeDataStory,
} from "@/components/users/UserHeader/UserHeader.stories";

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
import { UserHeader, UserHeaderSkeleton } from "@/components/users/UserHeader";

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
    UserDetailContainer: () => <UserDetail {...UserDetailStory.args} />,
    UserHeaderContainer: () => <UserHeader {...UserHeaderStory.args} />,
  },
} satisfies Story;

export const Loading: Story = {
  args: {
    UserDetailContainer: () => <UserDetailSkeleton />,
    UserHeaderContainer: () => <UserHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData: Story = {
  args: {
    UserDetailContainer: () => (
      <UserDetail {...UserDetailWithoutSomeDataStory.args} />
    ),
    UserHeaderContainer: () => (
      <UserHeader {...UserHeaderWithoutSomeDataStory.args} />
    ),
  },
} satisfies Story;
