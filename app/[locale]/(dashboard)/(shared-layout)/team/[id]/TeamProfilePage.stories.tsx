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
import { UserImageMenuTrigger } from "@/components/users/UserImageMenuTrigger";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import { editUserFormArgs } from "@/components/users/EditUserForm/__stories__";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";
import { withUpdateUserProvider } from "@/components/users/UpdateUserContext/__stories__";
import { withDeleteUserProvider } from "@/components/users/DeleteUserContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withChangePasswordProvider } from "@/components/users/ChangePasswordContext/__stories__";
import { withUpdateUserImageProvider } from "@/components/users/UpdateUserImageContext/__stories__";

const meta = {
  title: "pages/TeamProfilePage",
  component: TeamProfilePage,
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
    userId: mockedUserDetail.id,
    userFullName: mockedUserDetail.fullName,
    showUserActions: true,
    editUserFormContainer: <EditUserForm {...editUserFormArgs} />,
    profileDetailContainer: <UserDetail {...mockedUserDetail} />,
    userHeaderContainer: (
      <UserDetailHeader
        fullName={mockedUserDetail.fullName}
        positionName={mockedUserDetail.position?.name}
        imageSlot={
          <UserImageMenuTrigger>
            <PersonDetailHeaderImage
              alt={mockedUserDetail.fullName}
              imageUrl={mockedUserDetail.imageUrl}
            />
          </UserImageMenuTrigger>
        }
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
    userHeaderContainer: (
      <UserDetailHeader
        fullName={mockedUserDetail.fullName}
        imageSlot={
          <UserImageMenuTrigger>
            <PersonDetailHeaderImage />
          </UserImageMenuTrigger>
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
