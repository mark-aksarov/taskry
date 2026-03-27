import { mocked } from "storybook/test";
import { UserDetail } from "../UserDetail";
import { UpdateUserForm } from "../UpdateUserForm";
import { UpdateUserModal } from "../UpdateUserModal";
import { mockedUserDetail } from "@/mocks/users";
import { UserDetailCard } from "./UserDetailCard";
import { UserDetailSkeleton } from "../UserDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedPositionSummaries } from "@/mocks/positions";
import { ChangePasswordModal } from "../ChangePasswordModal";
import { UserNavigationLarge } from "../UserNavigationLarge";
import { UserDetailHeaderInteractive } from "../UserDetailHeader";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteUserProvider } from "../DeleteUserContext/__stories__";
import { withUpdateUserProvider } from "../UpdateUserContext/__stories__";
import { ProfileActions, ProfileActionsSkeleton } from "../ProfileActions";
import { withChangePasswordProvider } from "../ChangePasswordContext/__stories__";
import { MockedUserDetailHeaderProviders } from "../UserDetailHeader/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withDeleteUserImageModalProvider } from "@/components/users/DeleteUserImageModal/__stories__";

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
        <UpdateUserModal
          editUserFormContainer={
            <UpdateUserForm
              {...mockedUserDetail}
              userId={mockedUserDetail.id}
              positionSelectItems={mockedPositionSummaries}
            />
          }
        />
      </>
    ),
    withDeleteUserImageModalProvider,
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
      <MockedUserDetailHeaderProviders>
        <UserDetailHeaderInteractive
          userId={mockedUserDetail.id}
          fullName={mockedUserDetail.fullName}
          positionName={mockedUserDetail.position.name}
          imageUrl={mockedUserDetail.imageUrl}
        />
      </MockedUserDetailHeaderProviders>
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
      <MockedUserDetailHeaderProviders>
        <UserDetailHeaderInteractive
          userId={mockedUserDetail.id}
          fullName={mockedUserDetail.fullName}
        />
      </MockedUserDetailHeaderProviders>
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
