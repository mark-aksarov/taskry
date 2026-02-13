import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserListItemSkeleton } from "../UserListItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserListItemSkeleton",
  component: UserListItemSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
