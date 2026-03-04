import { mocked } from "storybook/test";
import { UserDetail } from "../UserDetail";
import { mockedUserDetail } from "@/mocks/users";
import { UserDetailCard } from "./UserDetailCard";
import { UserDetailSkeleton } from "../UserDetail";
import { UserDetailHeader } from "../UserDetailHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { UserNavigationDesktop } from "../UserNavigationDesktop";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProfileActions, ProfileActionsSkeleton } from "../ProfileActions";

const meta = {
  title: "components/users/UserDetailCard",
  component: UserDetailCard,
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/info");
    mocked(useParams).mockReturnValue({
      id: "user-1",
    });
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    profileDetail: <UserDetail {...mockedUserDetail} />,
    profileHeader: (
      <UserDetailHeader
        fullName={mockedUserDetail.fullName}
        imageUrl="/man.jpg"
        positionName={mockedUserDetail.position?.name}
      />
    ),
    navigationDesktop: (
      <UserNavigationDesktop
        userActions={<ProfileActions userId="user-1" userFullName="User 1" />}
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
    profileHeader: <UserDetailHeader fullName={mockedUserDetail.fullName} />,
    navigationDesktop: (
      <UserNavigationDesktop
        userActions={<ProfileActions userId="user-1" userFullName="User 1" />}
      />
    ),
  },
} satisfies Story;
