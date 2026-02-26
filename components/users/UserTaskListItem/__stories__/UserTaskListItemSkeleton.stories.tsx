import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserTaskListItemSkeleton } from "../UserTaskListItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserTaskListItemSkeleton",
  component: UserTaskListItemSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserTaskListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
