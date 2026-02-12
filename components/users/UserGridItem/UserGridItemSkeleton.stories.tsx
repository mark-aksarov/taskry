import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserGridItemSkeleton } from "./UserGridItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/users/UserGridItemSkeleton",
  component: UserGridItemSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserGridItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
