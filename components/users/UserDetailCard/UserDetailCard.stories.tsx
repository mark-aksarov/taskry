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
import { ChangePasswordModal } from "../ChangePasswordModal";
import { editUserFormArgs } from "../EditUserForm/__stories__";
import { UserImageMenuTrigger } from "../UserImageMenuTrigger";
import { UserNavigationDesktop } from "../UserNavigationDesktop";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProfileActions, ProfileActionsSkeleton } from "../ProfileActions";
import { withDeleteUserProvider } from "../DeleteUserContext/__stories__";
import { withUpdateUserProvider } from "../UpdateUserContext/__stories__";
import { withChangePasswordProvider } from "../ChangePasswordContext/__stories__";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withUpdateUserImageProvider } from "../UpdateUserImageContext/__stories__";

const meta = {
  title: "components/users/UserDetailCard",
  component: UserDetailCard,
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/team/user-1");
    mocked(useParams).mockReturnValue({
      id: "user-1",
    });
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <ChangePasswordModal userId="user-1" />
        <EditUserModal
          editUserFormContainer={<EditUserForm {...editUserFormArgs} />}
        />
      </>
    ),
    withUpdateUserImageProvider,
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
    profileDetail: <UserDetail {...mockedUserDetail} />,
    profileHeader: (
      <UserDetailHeader
        fullName={mockedUserDetail.fullName}
        imageSlot={
          <UserImageMenuTrigger>
            <PersonDetailHeaderImage
              alt={mockedUserDetail.fullName}
              imageUrl={mockedUserDetail.imageUrl}
            />
          </UserImageMenuTrigger>
        }
        positionName={mockedUserDetail.position?.name}
      />
    ),
    navigationDesktop: (
      <UserNavigationDesktop
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
    profileDetail: <UserDetailSkeleton />,
    profileHeader: <DetailHeaderSkeleton />,
    navigationDesktop: (
      <UserNavigationDesktop userActions={<ProfileActionsSkeleton />} />
    ),
  },
} satisfies Story;

export const WithoutOptionalUserData = {
  args: {
    profileDetail: (
      <UserDetail
        id={mockedUserDetail.id}
        fullName={mockedUserDetail.fullName}
        email={mockedUserDetail.email}
      />
    ),
    profileHeader: (
      <UserDetailHeader
        fullName={mockedUserDetail.fullName}
        imageSlot={
          <UserImageMenuTrigger>
            <PersonDetailHeaderImage />
          </UserImageMenuTrigger>
        }
      />
    ),
    navigationDesktop: (
      <UserNavigationDesktop
        userActions={<ProfileActions userId="user-1" userFullName="User 1" />}
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
