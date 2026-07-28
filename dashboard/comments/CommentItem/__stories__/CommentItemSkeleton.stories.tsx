import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentItemSkeleton } from "../CommentItemSkeleton";

const meta = {
  title: "dashboard/comments/CommentItemSkeleton",
  component: CommentItemSkeleton,
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CommentItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
