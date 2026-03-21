import { mocked } from "storybook/test";
import { UserDetail } from "../UserDetail";
import { EditUserForm } from "../EditUserForm";
import { EditUserModal } from "../EditUserModal";
import { mockedUserDetail } from "@/mocks/users";
import { UserDetailCard } from "./UserDetailCard";
import { UserDetailSkeleton } from "../UserDetail";
import { UserDetailHeader } from "../UserDetailHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedPositionSummaries } from "@/mocks/positions";
import { ChangePasswordModal } from "../ChangePasswordModal";
import { UserNavigationLarge } from "../UserNavigationLarge";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteUserProvider } from "../DeleteUserContext/__stories__";
import { withUpdateUserProvider } from "../UpdateUserContext/__stories__";
import { ProfileActions, ProfileActionsSkeleton } from "../ProfileActions";
import { withChangePasswordProvider } from "../ChangePasswordContext/__stories__";
import { withDeleteUserImageProvider } from "../DeleteUserImageContext/__stories__";
import { withUpdateUserImageProvider } from "../UpdateUserImageContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";

const meta = {
  title: "components/users/UserDetailCard",
  component: UserDetailCard,
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/team/user-1");
    mocked(useParams).mockReturnValue({
      id: mockedUserDetail.id,
    });
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <ChangePasswordModal userId={mockedUserDetail.id} />
        <EditUserModal
          editUserFormContainer={
            <EditUserForm
              {...mockedUserDetail}
              userId={mockedUserDetail.id}
              positionSelectItems={mockedPositionSummaries}
            />
          }
        />
      </>
    ),
    withUpdateUserImageProvider,
    withDeleteUserImageProvider,
    withUpdateUserProvider,
    withChangePasswordProvider,
    withDeleteUserProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
    userDetailHeaderContainer: (
      <UserDetailHeader
        userId={mockedUserDetail.id}
        fullName={mockedUserDetail.fullName}
        positionName={mockedUserDetail.position.name}
        imageUrl={mockedUserDetail.imageUrl}
        canUpdateImage={true}
      />
    ),
    navigationLarge: (
      <UserNavigationLarge
        userActions={
          <ProfileActions
            userId={mockedUserDetail.id}
            userFullName={mockedUserDetail.fullName}
          />
        }
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    userDetailContainer: <UserDetailSkeleton />,
    userDetailHeaderContainer: <DetailHeaderSkeleton />,
    navigationLarge: (
      <UserNavigationLarge userActions={<ProfileActionsSkeleton />} />
    ),
  },
} satisfies Story;

export const WithoutOptionalUserData = {
  args: {
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
    userDetailHeaderContainer: (
      <UserDetailHeader
        canUpdateImage={true}
        userId={mockedUserDetail.id}
        fullName={mockedUserDetail.fullName}
      />
    ),
    navigationLarge: (
      <UserNavigationLarge
        userActions={
          <ProfileActions
            userId={mockedUserDetail.id}
            userFullName={mockedUserDetail.fullName}
          />
        }
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
