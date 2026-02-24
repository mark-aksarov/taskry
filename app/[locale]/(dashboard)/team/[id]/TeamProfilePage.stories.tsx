import { mocked } from "storybook/test";
import { mockedUserDetail } from "@/mocks/users";
import { TeamProfilePage } from "./TeamProfilePage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TeamProfileTemplate from "./TeamProfileTemplate";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { ProfileActions } from "@/components/users/ProfileActions";
import { UserDetailHeader } from "@/components/users/UserDetailHeader";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import { profileActionsArgs } from "@/components/users/ProfileActions/__stories__";

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
    profileDetailContainer: <UserDetail {...mockedUserDetail} />,
    userHeaderContainer: (
      <UserDetailHeader
        fullName="User 1"
        positionName="Position 1"
        imageUrl="/man.jpg"
      />
    ),
    userActions: <ProfileActions {...profileActionsArgs} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    profileDetailContainer: <UserDetailSkeleton />,
    userHeaderContainer: <DetailHeaderSkeleton />,
    userActions: <ProfileActions {...profileActionsArgs} />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    profileDetailContainer: <UserDetail {...mockedUserDetail} />,
    userHeaderContainer: <UserDetailHeader fullName="User 1" />,
    userActions: <ProfileActions {...profileActionsArgs} />,
  },
} satisfies Story;
