import { UserDetailModal } from "./UserDetailModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { UserDetailSkeleton } from "../UserDetail/UserDetailSkeleton";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { GlobalContainerProvider } from "@/components/layout/GlobalContainerContext";

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
  args: {
    userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
  },
} satisfies Meta<typeof UserDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithSkeletonContent = {
  decorators: [
    (Story) => (
      <GlobalContainerProvider
        value={{
          UserDetailContainer: () => (
            <div className="flex flex-col gap-6">
              <PersonHeaderSkeleton />
              <UserDetailSkeleton />
            </div>
          ),
        }}
      >
        <Story />
      </GlobalContainerProvider>
    ),
  ],
} satisfies Story;
