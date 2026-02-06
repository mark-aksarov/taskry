import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { Button } from "@/components/ui/Button";
import { UserDetailModal } from "./UserDetailModal";
import { UserDetail } from "../UserDetail/UserDetail";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetailSkeleton } from "../UserDetail/UserDetailSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";
import { Default as UserDetailStory } from "@/components/users/UserDetail/UserDetail.stories";
import { PersonDetailHeader as PersonDetailHeaderStory } from "@/components/common/DetailHeader/DetailHeader.stories";

const meta = {
  title: "components/users/UserDetailModal",
  component: UserDetailModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="User detail" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof UserDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    userDetailContainer: (
      <PersonDetailPresentation
        personHeader={<DetailHeader {...PersonDetailHeaderStory.args} />}
        userDetail={<UserDetail {...UserDetailStory.args} />}
      />
    ),
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    userDetailContainer: (
      <PersonDetailPresentation
        personHeader={<DetailHeaderSkeleton />}
        userDetail={<UserDetailSkeleton />}
      />
    ),
  },
} satisfies Story;
