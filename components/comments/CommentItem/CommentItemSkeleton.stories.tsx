import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentItemSkeleton } from "./CommentItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/comments/CommentItemSkeleton",
  component: CommentItemSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CommentItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
