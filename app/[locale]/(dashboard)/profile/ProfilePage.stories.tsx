import { mocked } from "storybook/test";
import { ProfilePage } from "./ProfilePage";
import { usePathname } from "next/navigation";
import ProfileTemplate from "./ProfileTemplate";
import { mockedUserDetail } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { ProfileActions } from "@/components/users/ProfileActions";
import { UserDetailHeader } from "@/components/users/UserDetailHeader";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import { profileActionsArgs } from "@/components/users/ProfileActions/__stories__";

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
    profileDetailContainer: <UserDetail {...mockedUserDetail} />,
    userHeaderContainer: (
      <UserDetailHeader
        fullName="User 1"
        imageUrl="/man.jpg"
        positionName="Position 1"
      />
    ),
    profileActions: <ProfileActions {...profileActionsArgs} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    profileDetailContainer: <UserDetailSkeleton />,
    userHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalUserData = {
  args: {
    profileDetailContainer: (
      <UserDetail
        id={mockedUserDetail.id}
        fullName={mockedUserDetail.fullName}
        email={mockedUserDetail.email}
      />
    ),
    userHeaderContainer: <UserDetailHeader fullName="User 1" />,
    profileActions: <ProfileActions {...profileActionsArgs} />,
  },
} satisfies Story;
