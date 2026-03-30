import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { mockedUserDetail } from "@/mocks/users";
import { UserDetailModal } from "../UserDetailModal";
import { UserDetailHeader } from "../UserDetailHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetail, UserDetailSkeleton } from "../UserDetail";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";

const meta = {
  title: "components/users/UserDetailModal",
  component: UserDetailModal,
  decorators: [
    withOpenModal,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "userDetail",
  },
} satisfies Meta<typeof UserDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
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
    userId: "user-1",
    userDetailHeaderContainer: <DetailHeaderSkeleton />,
    userDetailContainer: <UserDetailSkeleton />,
  },
} satisfies Story;
