import {
  Default as UserHeaderStory,
  WithoutSomeData as UserHeaderWithoutSomeDataStory,
} from "@/components/users/UserHeader/UserHeader.stories";

import {
  Default as UserDetailStory,
  WithoutSomeData as UserDetailWithoutSomeDataStory,
} from "@/components/users/UserDetail/UserDetail.stories";

import { mocked } from "storybook/test";
import { ProfilePage } from "./ProfilePage";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import { UserHeader, UserHeaderSkeleton } from "@/components/users/UserHeader";

const userId = "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI";

const meta = {
  title: "components/pages/ProfilePage",
  component: ProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile");
  },
  args: {
    userId,
  },
} satisfies Meta<typeof ProfilePage>;

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
