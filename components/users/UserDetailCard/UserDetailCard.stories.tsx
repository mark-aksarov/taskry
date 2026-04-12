import { mocked } from "storybook/test";
import { UserDetailAlt } from "../UserDetailAlt";
import { mockedUserDetail } from "@/mocks/users";
import { UserDetailCard } from "./UserDetailCard";
import { UserDetailSkeleton } from "../UserDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { UserNavigationLarge } from "../UserNavigationLarge";
import { UserDetailHeaderInteractive } from "../UserDetailHeader";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteUserProvider } from "../DeleteUserProvider/__stories__";
import { ProfileActions, ProfileActionsSkeleton } from "../ProfileActions";
import { withChangePasswordProvider } from "../ChangePasswordProvider/__stories__";
import { withUpdateUserImageProvider } from "../UpdateUserImageProvider/__stories__";
import { withClearUserImageUrlProvider } from "../ClearUserImageUrlProvider/__stories__";
import { withUpdateUserImageFileProvider } from "../UpdateUserImageFileContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withUpdateUserBioProvider } from "@/components/users/UpdateUserBioProvider/__stories__";
import { withUpdateUserAddressProvider } from "@/components/users/UpdateUserAddressProvider/__stories__";
import { withUpdateUserPositionProvider } from "@/components/users/UpdateUserPositionProvider/__stories__";
import { withUpdateUserFullNameProvider } from "@/components/users/UpdateUserFullNameProvider/__stories__";
import { withUpdateUserBirthdateProvider } from "@/components/users/UpdateUserBirthdateProvider/__stories__";
import { withUpdateUserPublicLinkProvider } from "@/components/users/UpdateUserPublicLinkProvider/__stories__";
import { withUpdateUserPhoneNumberProvider } from "@/components/users/UpdateUserPhoneNumberProvider/__stories__";

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
    withChangePasswordProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userDetailContainer: <UserDetailAlt {...mockedUserDetail} />,
    userDetailHeaderContainer: (
      <UserDetailHeaderInteractive
        fullName={mockedUserDetail.fullName}
        positionName={mockedUserDetail.position.name}
        imageUrl={mockedUserDetail.imageUrl}
      />
    ),
    navigationLarge: (
      <UserNavigationLarge
        userActions={<ProfileActions userId={mockedUserDetail.id} />}
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
    userDetailContainer: <UserDetailAlt {...mockedUserDetail} />,
    userDetailHeaderContainer: (
      <UserDetailHeaderInteractive fullName={mockedUserDetail.fullName} />
    ),
    navigationLarge: (
      <UserNavigationLarge
        userActions={<ProfileActions userId={mockedUserDetail.id} />}
      />
    ),
  },
} satisfies Story;
