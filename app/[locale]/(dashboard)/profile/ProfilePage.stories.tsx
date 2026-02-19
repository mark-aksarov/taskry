import {
  UserDetailStory,
  UserDetailWithoutSomeDataStory,
} from "@/components/users/UserDetail/__stories__";

import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { mocked } from "storybook/test";
import { ProfilePage } from "./ProfilePage";
import { usePathname } from "next/navigation";
import ProfileTemplate from "./ProfileTemplate";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { ProfileActions } from "@/components/users/ProfileActions";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import { ProfileActionsStory } from "@/components/users/ProfileActions/__stories__";
import { PersonDetailHeaderStory } from "@/components/common/DetailHeader/__stories__";

const meta = {
  title: "pages/ProfilePage",
  component: ProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <ProfileTemplate {...AppHeaderStory.args}>
        <Story />
      </ProfileTemplate>
    ),
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile");
  },
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    profileDetailContainer: <UserDetail {...UserDetailStory.args} />,
    userHeaderContainer: <DetailHeader {...PersonDetailHeaderStory.args} />,
    profileActions: <ProfileActions {...ProfileActionsStory.args} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    profileDetailContainer: <UserDetailSkeleton />,
    userHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    profileDetailContainer: (
      <UserDetail {...UserDetailWithoutSomeDataStory.args} />
    ),
    userHeaderContainer: <DetailHeader {...PersonDetailHeaderStory.args} />,
    profileActions: <ProfileActions {...ProfileActionsStory.args} />,
  },
} satisfies Story;
