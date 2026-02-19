import {
  UserDetailStory,
  UserDetailWithoutSomeDataStory,
} from "@/components/users/UserDetail/__stories__";

import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { mocked } from "storybook/test";
import { TeamProfilePage } from "./TeamProfilePage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TeamProfileTemplate from "./TeamProfileTemplate";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { ProfileActions } from "@/components/users/ProfileActions";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import { ProfileActionsStory } from "@/components/users/ProfileActions/__stories__";
import { PersonDetailHeaderStory } from "@/components/common/DetailHeader/__stories__";

const meta = {
  title: "pages/TeamProfilePage",
  component: TeamProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <TeamProfileTemplate {...AppHeaderStory.args}>
        <Story />
      </TeamProfileTemplate>
    ),
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue(`/team/user-1`);
    mocked(useParams).mockReturnValue({
      id: "user-1",
    });
  },
} satisfies Meta<typeof TeamProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    profileDetailContainer: <UserDetail {...UserDetailStory.args} />,
    userHeaderContainer: <DetailHeader {...PersonDetailHeaderStory.args} />,
    userActions: <ProfileActions {...ProfileActionsStory.args} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    profileDetailContainer: <UserDetailSkeleton />,
    userHeaderContainer: <DetailHeaderSkeleton />,
    userActions: <ProfileActions {...ProfileActionsStory.args} />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    profileDetailContainer: (
      <UserDetail {...UserDetailWithoutSomeDataStory.args} />
    ),
    userHeaderContainer: <DetailHeader {...PersonDetailHeaderStory.args} />,
    userActions: <ProfileActions {...ProfileActionsStory.args} />,
  },
} satisfies Story;
