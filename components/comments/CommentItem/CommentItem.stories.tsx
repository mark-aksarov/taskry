import { CommentItem } from "./CommentItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  commentsMock,
  commentWithRepliesMock,
} from "@/lib/data/__mocks__/comments";
import { CommentItemActions } from "./CommentItemActions";
import { CommentButton } from "../CommentButton";
import { Heart } from "lucide-react";
import { CommentModalTrigger } from "../CommentModalTrigger";
import { mocked } from "storybook/test";
import { getCommentWithReplies } from "@/lib/queries/comments";

const meta = {
  title: "Components/comments/CommentItem",
  component: CommentItem,
  tags: ["autodocs"],
  args: {
    comment: commentsMock[0],
    renderActions: () => null,
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
    const comment = commentsMock[0];

    const isLiked = comment && comment.likes.length > 0;

    return (
      <CommentItem
        {...args}
        renderActions={() => (
          <CommentItemActions>
            <CommentModalTrigger commentId={comment.id} />
            <CommentButton
              icon={<Heart size={16} strokeWidth={1.5} absoluteStrokeWidth />}
              label={comment._count.likes}
              aria-label="Like comment"
              color={isLiked ? "red" : "default"}
              fill={isLiked}
            />
          </CommentItemActions>
        )}
      />
    );
  },
};

export const Skeleton: Story = {
  args: {
    comment: undefined,
  },
};
