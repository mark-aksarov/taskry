import { CommentItem } from "./CommentItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  commentsMock,
  commentWithRepliesMock,
} from "@/lib/data/__mocks__/comments";
import { mocked } from "storybook/test";
import { getCommentWithReplies } from "@/lib/queries/comments";

const meta = {
  title: "Components/comments/CommentItem",
  component: CommentItem,
  tags: ["autodocs"],
  args: {
    comment: commentsMock[0],
  },
  beforeEach: () => {
    mocked(getCommentWithReplies).mockReturnValue(
      new Promise((res) => res(commentWithRepliesMock)),
    );
  },
} satisfies Meta<typeof CommentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <CommentItem {...args} />;
  },
};

export const Skeleton: Story = {
  args: {
    comment: undefined,
  },
};
