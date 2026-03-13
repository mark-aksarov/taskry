import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { mockedUserDetail } from "@/mocks/users";
import { UserDetailModal } from "../UserDetailModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetail } from "../../UserDetail/UserDetail";
import { UserDetailHeader } from "../../UserDetailHeader";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { UserDetailSkeleton } from "../../UserDetail/UserDetailSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";

const meta = {
  title: "components/users/UserDetailModal",
  component: UserDetailModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="User detail" />
          <Story />
        </DialogTrigger>
      );
    },
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
    userDetailHeaderContainer: (
      <UserDetailHeader
        canUpdateImage
        userId={mockedUserDetail.id}
        fullName={mockedUserDetail.fullName}
        imageUrl={mockedUserDetail.imageUrl}
        positionName={mockedUserDetail.position.name}
        createPresignedUrl={() => ({ status: "success" })}
        updateUserImageUrl={() => ({ status: "success" })}
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
