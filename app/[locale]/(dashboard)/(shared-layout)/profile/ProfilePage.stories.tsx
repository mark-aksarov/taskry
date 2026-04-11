import { mocked } from "storybook/test";
import AppProfileLoading from "./loading";
import { ProfilePage } from "./ProfilePage";
import { usePathname } from "next/navigation";
import { mockedUserDetail } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetailAlt } from "@/components/users/UserDetailAlt";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserDetailHeaderInteractive } from "@/components/users/UserDetailHeader";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { withDeleteUserProvider } from "@/components/users/DeleteUserProvider/__stories__";
import { withUpdateUserBioProvider } from "@/components/users/UpdateUserBioProvider/__stories__";
import { withChangePasswordProvider } from "@/components/users/ChangePasswordProvider/__stories__";
import { withUpdateUserImageProvider } from "@/components/users/UpdateUserImageProvider/__stories__";
import { withClearUserImageUrlProvider } from "@/components/users/ClearUserImageUrlProvider/__stories__";
import { withUpdateUserImageFileProvider } from "@/components/users/UpdateUserImageFileContext/__stories__";
import { withUpdateUserFullNameProvider } from "@/components/users/UpdateUserFullNameProvider/__stories__";
import { withUpdateUserPhoneNumberProvider } from "@/components/users/UpdateUserPhoneNumberProvider/__stories__";

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
