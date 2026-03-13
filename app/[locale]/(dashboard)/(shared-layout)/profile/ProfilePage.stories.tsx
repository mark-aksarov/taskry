import { mocked } from "storybook/test";
import { ProfilePage } from "./ProfilePage";
import { usePathname } from "next/navigation";
import { mockedUserDetail } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mockedPositionSummaries } from "@/mocks/positions";
import { EditUserForm } from "@/components/users/EditUserForm";
import { UserDetailHeader } from "@/components/users/UserDetailHeader";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import { withDeleteUserProvider } from "@/components/users/DeleteUserContext/__stories__";
import { withUpdateUserProvider } from "@/components/users/UpdateUserContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withChangePasswordProvider } from "@/components/users/ChangePasswordContext/__stories__";
import { withUpdateUserImageProvider } from "@/components/users/UpdateUserImageContext/__stories__";

const meta = {
  title: "pages/ProfilePage",
  component: ProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withUpdateUserImageProvider,
    withUpdateUserProvider,
    withChangePasswordProvider,
    withDeleteUserProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
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
    userId: mockedUserDetail.id,
    userFullName: mockedUserDetail.fullName,
    editUserFormContainer: (
      <EditUserForm
        {...mockedUserDetail}
        userId={mockedUserDetail.id}
        userPositionSelectItems={mockedPositionSummaries}
      />
    ),
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
    userDetailHeaderContainer: (
      <UserDetailHeader
        fullName={mockedUserDetail.fullName}
        positionName={mockedUserDetail.position.name}
        imageUrl={mockedUserDetail.imageUrl}
        canUpdateImage={true}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    userDetailContainer: <UserDetailSkeleton />,
    userDetailHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalUserData = {
  args: {
    ...Default.args,
    userDetailContainer: (
      <UserDetail
        id={mockedUserDetail.id}
        fullName={mockedUserDetail.fullName}
        email={mockedUserDetail.email}
      />
    ),
    userDetailHeaderContainer: (
      <UserDetailHeader
        fullName={mockedUserDetail.fullName}
        canUpdateImage={true}
      />
    ),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
