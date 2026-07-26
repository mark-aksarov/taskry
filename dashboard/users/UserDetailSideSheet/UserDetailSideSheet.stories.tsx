import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { mockedUserDetail } from "@/mocks/users";
import { UserDetailHeader } from "../UserDetailHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetailSideSheet } from "./UserDetailSideSheet";
import { UserDetail, UserDetailSkeleton } from "../UserDetail";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSessionProvider } from "@/common/SessionContext/__stories__";

const meta = {
  title: "dashboard/users/UserDetailSideSheet",
  component: UserDetailSideSheet,
  decorators: [
    withOpenModal,
    withSessionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

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
