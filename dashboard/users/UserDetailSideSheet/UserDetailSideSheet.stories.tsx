import { mockedUserDetail } from "@/mocks/users";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { UserDetailHeader } from "../UserDetailHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetailSideSheet } from "./UserDetailSideSheet";
import { UserDetail, UserDetailSkeleton } from "../UserDetail";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/UserDetailSideSheet",
  component: UserDetailSideSheet,
  decorators: [withOpenModal, withDashboardLayoutProviders],

  parameters: {
    modalId: "userDetail",
  },
} satisfies Meta<typeof UserDetailSideSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: mockedUserDetail.id,
    userDetailHeaderContainer: (
      <UserDetailHeader
        fullName={mockedUserDetail.fullName}
        imageUrl={mockedUserDetail.imageUrl}
        positionName={mockedUserDetail.position.name}
      />
    ),
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    userId: mockedUserDetail.id,
    userDetailHeaderContainer: <DetailHeaderSkeleton />,
    userDetailContainer: <UserDetailSkeleton />,
  },
} satisfies Story;
