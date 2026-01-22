import { UserDetailModal } from "./UserDetailModal";
import { UserDetail } from "../UserDetail/UserDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { UserDetailSkeleton } from "../UserDetail/UserDetailSkeleton";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as UserDetailStory } from "../UserDetail/UserDetail.stories";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

const meta = {
  title: "components/users/UserDetailModal",
  component: UserDetailModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="User detail" />
        <Story />
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof UserDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    userDetailContainer: <UserDetail {...UserDetailStory.args} />,
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    userDetailContainer: (
      <PersonDetailPresentation
        personHeader={<PersonHeaderSkeleton />}
        userDetail={<UserDetailSkeleton />}
      />
    ),
  },
} satisfies Story;
