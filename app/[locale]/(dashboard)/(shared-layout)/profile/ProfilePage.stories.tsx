import { mocked } from "storybook/test";
import { ProfilePage } from "./ProfilePage";
import { usePathname } from "next/navigation";
import { mockedUserDetail } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { mockedPositionSummaries } from "@/mocks/positions";
import { SearchList } from "@/components/search/SearchList";
import { UpdateUserForm } from "@/components/users/UpdateUserForm";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import { UserDetailHeaderInteractive } from "@/components/users/UserDetailHeader";
import { withDeleteUserProvider } from "@/components/users/DeleteUserContext/__stories__";
import { withUpdateUserProvider } from "@/components/users/UpdateUserProvider/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { MockedUserDetailHeaderProviders } from "@/components/users/UserDetailHeader/__stories__";
import { withChangePasswordProvider } from "@/components/users/ChangePasswordContext/__stories__";
import { MockedUpdateUserImageProvider } from "@/components/users/UpdateUserImageProvider/__stories__";
import { MockedClearUserImageUrlProvider } from "@/components/users/ClearUserImageUrlProvider/__stories__";

const meta = {
  title: "pages/ProfilePage",
  component: ProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withUpdateUserProvider,
    withChangePasswordProvider,
    withDeleteUserProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    SharedPageDecorator,
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
    updateUserFormContainer: (
      <UpdateUserForm
        {...mockedUserDetail}
        userId={mockedUserDetail.id}
        positionSelectItems={mockedPositionSummaries}
      />
    ),
    searchContainer: <SearchList {...SearchListStory.args} />,
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
      <MockedClearUserImageUrlProvider>
        <MockedUpdateUserImageProvider>
          <UserDetailHeaderInteractive
            userId={mockedUserDetail.id}
            fullName={mockedUserDetail.fullName}
          />
        </MockedUpdateUserImageProvider>
      </MockedClearUserImageUrlProvider>
    ),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
