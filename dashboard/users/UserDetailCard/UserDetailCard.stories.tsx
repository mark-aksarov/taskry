import {
  UserNavigationLarge,
  UserNavigationLargeSkeleton,
} from "../UserNavigationLarge";

import { mocked } from "storybook/test";
import { UserDetailAlt } from "../UserDetailAlt";
import { mockedUserDetail } from "@/mocks/users";
import { UserDetailCard } from "./UserDetailCard";
import { ProfileActions } from "../ProfileActions";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetailAltSkeleton } from "../UserDetailAlt";
import { useParams, usePathname } from "next/navigation";
import { UserDetailHeaderInteractive } from "../UserDetailHeader";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteUserProvider } from "../DeleteUserProvider/__stories__";
import { withChangePasswordProvider } from "../ChangePasswordProvider/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withUpdateUserImageProvider } from "../UpdateUserImageProvider/__stories__";
import { withClearUserImageUrlProvider } from "../ClearUserImageUrlProvider/__stories__";
import { withUpdateUserImageFileProvider } from "../UpdateUserImageFileContext/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withUpdateUserBioProvider } from "@/dashboard/users/UpdateUserBioProvider/__stories__";
import { withUpdateUserAddressProvider } from "@/dashboard/users/UpdateUserAddressProvider/__stories__";
import { withUpdateUserPositionProvider } from "@/dashboard/users/UpdateUserPositionProvider/__stories__";
import { withUpdateUserFullNameProvider } from "@/dashboard/users/UpdateUserFullNameProvider/__stories__";
import { withUpdateUserBirthdateProvider } from "@/dashboard/users/UpdateUserBirthdateProvider/__stories__";
import { withUpdateUserPublicLinkProvider } from "@/dashboard/users/UpdateUserPublicLinkProvider/__stories__";
import { withUpdateUserPhoneNumberProvider } from "@/dashboard/users/UpdateUserPhoneNumberProvider/__stories__";

const meta = {
  title: "dashboard/users/UserDetailCard",
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
    userDetailContainer: <UserDetailAltSkeleton />,
    userDetailHeaderContainer: <DetailHeaderSkeleton />,
    navigationLarge: <UserNavigationLargeSkeleton />,
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
