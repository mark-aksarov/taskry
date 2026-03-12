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
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

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
    withThemedBackground,
  ],
} satisfies Meta<typeof UserDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
    userDetailContainer: (
      <PersonDetailPresentation
        personHeader={
          <UserDetailHeader
            fullName={mockedUserDetail.fullName}
            positionName={mockedUserDetail.position?.name}
            userId={mockedUserDetail.id}
            imageUrl={mockedUserDetail.imageUrl}
          />
        }
        userDetail={<UserDetail {...mockedUserDetail} />}
      />
    ),
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    userId: "user-1",
    userDetailContainer: (
      <PersonDetailPresentation
        personHeader={<DetailHeaderSkeleton />}
        userDetail={<UserDetailSkeleton />}
      />
    ),
  },
} satisfies Story;
