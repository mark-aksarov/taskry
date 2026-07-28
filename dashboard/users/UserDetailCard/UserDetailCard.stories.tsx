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
import { DeleteUserProvider } from "../DeleteUserContext";
import { UpdateUserBioProvider } from "../UpdateUserBioContext";
import { UserDetailHeaderInteractive } from "../UserDetailHeader";
import { ChangePasswordProvider } from "../ChangePasswordContext";
import { UpdateUserImageProvider } from "../UpdateUserImageContext";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { UpdateUserAddressProvider } from "../UpdateUserAddressContext";
import { ClearUserImageUrlProvider } from "../ClearUserImageUrlContext";
import { UpdateUserFullNameProvider } from "../UpdateUserFullNameContext";
import { UpdateUserPositionProvider } from "../UpdateUserPositionContext";
import { UpdateUserBirthdateProvider } from "../UpdateUserBirthdateContext";
import { UpdateUserImageFileProvider } from "../UpdateUserImageFileContext";
import { UpdateUserPublicLinkProvider } from "../UpdateUserPublicLinkContext";
import { UpdateUserPhoneNumberProvider } from "../UpdateUserPhoneNumberContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/UserDetailCard",
  component: UserDetailCard,
  beforeEach: () => {
    mocked(usePathname).mockReturnValue(`/team/${mockedUserDetail.id}`);
    mocked(useParams).mockReturnValue({
      id: mockedUserDetail.id,
    });
  },
  decorators: [
    (Story) => (
      <ChangePasswordProvider>
        <UpdateUserImageFileProvider>
          <ClearUserImageUrlProvider>
            <UpdateUserImageProvider>
              <DeleteUserProvider>
                <UpdateUserPositionProvider>
                  <UpdateUserPublicLinkProvider>
                    <UpdateUserAddressProvider>
                      <UpdateUserBirthdateProvider>
                        <UpdateUserFullNameProvider>
                          <UpdateUserBioProvider>
                            <UpdateUserPhoneNumberProvider>
                              <Story />
                            </UpdateUserPhoneNumberProvider>
                          </UpdateUserBioProvider>
                        </UpdateUserFullNameProvider>
                      </UpdateUserBirthdateProvider>
                    </UpdateUserAddressProvider>
                  </UpdateUserPublicLinkProvider>
                </UpdateUserPositionProvider>
              </DeleteUserProvider>
            </UpdateUserImageProvider>
          </ClearUserImageUrlProvider>
        </UpdateUserImageFileProvider>
      </ChangePasswordProvider>
    ),
    withDashboardLayoutProviders,
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
