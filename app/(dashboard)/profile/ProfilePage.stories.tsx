import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfilePage } from "./ProfilePage";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import {
  ProfileInfo,
  ProfileInfoSkeleton,
} from "@/components/profile/ProfileInfo";
import { ProfileHeader } from "@/components/profile/ProfileHeader";

import {
  Default as ProfileHeaderStory,
  WithoutSomeData as ProfileHeaderWithoutSomeDataStory,
} from "@/components/profile/ProfileHeader/ProfileHeader.stories";

import {
  Default as ProfileInfoStory,
  WithoutSomeData as ProfileInfoWithoutSomeDataStory,
} from "@/components/profile/ProfileInfo/ProfileInfo.stories";

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
    ProfileInfoContainer: () => <ProfileInfo {...ProfileInfoStory.args} />,
    ProfileHeaderContainer: () => (
      <ProfileHeader {...ProfileHeaderStory.args} />
    ),
  },
} satisfies Story;

export const Loading: Story = {
  args: {
    ProfileInfoContainer: () => <ProfileInfoSkeleton />,
    ProfileHeaderContainer: () => <ProfileHeader />,
  },
} satisfies Story;

export const WithoutSomeData: Story = {
  args: {
    ProfileInfoContainer: () => (
      <ProfileInfo {...ProfileInfoWithoutSomeDataStory.args} />
    ),
    ProfileHeaderContainer: () => (
      <ProfileHeader {...ProfileHeaderWithoutSomeDataStory.args} />
    ),
  },
} satisfies Story;
