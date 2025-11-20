import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfilePage } from "./ProfilePage";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import {
  ProfileDetail,
  ProfileDetailSkeleton,
} from "@/components/profile/ProfileDetail";
import {
  ProfileHeader,
  ProfileHeaderSkeleton,
} from "@/components/profile/ProfileHeader";

import {
  Default as ProfileHeaderStory,
  WithoutSomeData as ProfileHeaderWithoutSomeDataStory,
} from "@/components/profile/ProfileHeader/ProfileHeader.stories";

import {
  Default as ProfileDetailStory,
  WithoutSomeData as ProfileDetailWithoutSomeDataStory,
} from "@/components/profile/ProfileDetail/ProfileDetail.stories";

const meta = {
  title: "components/pages/ProfilePage",
  component: ProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile");
  },
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ProfileDetailContainer: () => (
      <ProfileDetail {...ProfileDetailStory.args} />
    ),
    ProfileHeaderContainer: () => (
      <ProfileHeader {...ProfileHeaderStory.args} />
    ),
  },
} satisfies Story;

export const Loading: Story = {
  args: {
    ProfileDetailContainer: () => <ProfileDetailSkeleton />,
    ProfileHeaderContainer: () => <ProfileHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData: Story = {
  args: {
    ProfileDetailContainer: () => (
      <ProfileDetail {...ProfileDetailWithoutSomeDataStory.args} />
    ),
    ProfileHeaderContainer: () => (
      <ProfileHeader {...ProfileHeaderWithoutSomeDataStory.args} />
    ),
  },
} satisfies Story;
