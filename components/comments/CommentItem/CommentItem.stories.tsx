import { CommentItem } from "./CommentItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { commentsMock } from "@/lib/data/__mocks__/comments";

const meta = {
  title: "Components/comments/CommentItem",
  component: CommentItem,
  tags: ["autodocs"],
  args: {
    comment: commentsMock[0],
  },
} satisfies Meta<typeof CommentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Skeleton: Story = {
  args: {
    comment: undefined,
  },
};
