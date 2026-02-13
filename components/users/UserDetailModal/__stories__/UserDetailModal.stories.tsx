import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { Button } from "@/components/ui/Button";
import { UserDetailModal } from "../UserDetailModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetail } from "../../UserDetail/UserDetail";
import { UserDetailSkeleton } from "../../UserDetail/UserDetailSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserDetailStory } from "@/components/users/UserDetail/__stories__";
import { PersonDetailHeaderStory } from "@/components/common/DetailHeader/__stories__";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

const meta = {
  title: "components/users/UserDetailModal",
  component: UserDetailModal,
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
    userId: "user-1",
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
    userId: "user-1",
    userDetailContainer: (
      <PersonDetailPresentation
        personHeader={<DetailHeaderSkeleton />}
        userDetail={<UserDetailSkeleton />}
      />
    ),
  },
} satisfies Story;
