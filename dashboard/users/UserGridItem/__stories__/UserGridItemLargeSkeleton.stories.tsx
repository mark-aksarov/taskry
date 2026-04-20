import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserGridItemLargeSkeleton } from "../UserGridItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "dashboard/users/UserGridItemLargeSkeleton",
  component: UserGridItemLargeSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserGridItemLargeSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
