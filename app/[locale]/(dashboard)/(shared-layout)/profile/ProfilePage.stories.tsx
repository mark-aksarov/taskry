import { mocked } from "storybook/test";
import AppProfileLoading from "./loading";
import { ProfilePage } from "./ProfilePage";
import { usePathname } from "next/navigation";
import { mockedUserDetail } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetailAlt } from "@/dashboard/users/UserDetailAlt";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserDetailHeaderInteractive } from "@/dashboard/users/UserDetailHeader";
import { withTaskSearchModal } from "@/dashboard/tasks/TaskSearchModal/__stories__";
import { withDeleteUserProvider } from "@/dashboard/users/DeleteUserProvider/__stories__";
import { withUpdateUserBioProvider } from "@/dashboard/users/UpdateUserBioProvider/__stories__";
import { withChangePasswordProvider } from "@/dashboard/users/ChangePasswordProvider/__stories__";
import { withUpdateUserImageProvider } from "@/dashboard/users/UpdateUserImageProvider/__stories__";
import { withClearUserImageUrlProvider } from "@/dashboard/users/ClearUserImageUrlProvider/__stories__";
import { withUpdateUserAddressProvider } from "@/dashboard/users/UpdateUserAddressProvider/__stories__";
import { withUpdateUserPositionProvider } from "@/dashboard/users/UpdateUserPositionProvider/__stories__";
import { withUpdateUserFullNameProvider } from "@/dashboard/users/UpdateUserFullNameProvider/__stories__";
import { withUpdateUserImageFileProvider } from "@/dashboard/users/UpdateUserImageFileContext/__stories__";
import { withUpdateUserBirthdateProvider } from "@/dashboard/users/UpdateUserBirthdateProvider/__stories__";
import { withUpdateUserPublicLinkProvider } from "@/dashboard/users/UpdateUserPublicLinkProvider/__stories__";
import { withUpdateUserPhoneNumberProvider } from "@/dashboard/users/UpdateUserPhoneNumberProvider/__stories__";

const meta = {
  title: "pages/ProfilePage",
  component: ProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withChangePasswordProvider,
    withUpdateUserPhoneNumberProvider,
    withUpdateUserBioProvider,
    withUpdateUserFullNameProvider,
    withUpdateUserBirthdateProvider,
    withUpdateUserAddressProvider,
    withUpdateUserPublicLinkProvider,
    withUpdateUserPositionProvider,
    withDeleteUserProvider,
    withUpdateUserImageProvider,
    withClearUserImageUrlProvider,
    withUpdateUserImageFileProvider,
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
    userDetailContainer: <UserDetailAlt {...mockedUserDetail} />,
    userDetailHeaderContainer: (
      <UserDetailHeaderInteractive
        fullName={mockedUserDetail.fullName}
        positionName={mockedUserDetail.position.name}
        imageUrl={mockedUserDetail.imageUrl}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <AppProfileLoading />,
} satisfies Story;

export const WithoutOptionalUserData = {
  args: {
    ...Default.args,
    userDetailContainer: (
      <UserDetailAlt
        id={mockedUserDetail.id}
        fullName={mockedUserDetail.fullName}
        email={mockedUserDetail.email}
      />
    ),
    userDetailHeaderContainer: (
      <UserDetailHeaderInteractive fullName={mockedUserDetail.fullName} />
    ),
  },
} satisfies Story;
