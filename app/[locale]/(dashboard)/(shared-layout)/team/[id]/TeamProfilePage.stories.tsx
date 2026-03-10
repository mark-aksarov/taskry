import { mocked } from "storybook/test";
import { mockedUserDetail } from "@/mocks/users";
import { TeamProfilePage } from "./TeamProfilePage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { EditUserForm } from "@/components/users/EditUserForm";
import { UserDetailHeader } from "@/components/users/UserDetailHeader";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import { editUserFormArgs } from "@/components/users/EditUserForm/__stories__";
import { withUpdateUserProvider } from "@/components/users/UpdateUserContext/__stories__";
import { withDeleteUserProvider } from "@/components/users/DeleteUserContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withChangePasswordProvider } from "@/components/users/ChangePasswordContext/__stories__";

const meta = {
  title: "pages/TeamProfilePage",
  component: TeamProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withUpdateUserProvider,
    withChangePasswordProvider,
    withDeleteUserProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
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
    userId: "user-1",
    userFullName: "User 1",
    showUserActions: true,
    editUserFormContainer: <EditUserForm {...editUserFormArgs} />,
    profileDetailContainer: <UserDetail {...mockedUserDetail} />,
    userHeaderContainer: (
      <UserDetailHeader
        fullName="User 1"
        positionName="Position 1"
        imageUrl="/man.jpg"
      />
    ),
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
    ...Default.args,
    profileDetailContainer: <UserDetail {...mockedUserDetail} />,
    userHeaderContainer: <UserDetailHeader fullName="User 1" />,
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
