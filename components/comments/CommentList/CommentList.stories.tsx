import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentList } from "./CommentList";
import {
  commentsMock,
  commentWithRepliesMock,
} from "@/lib/data/__mocks__/comments";
import { CommentItem } from "../CommentItem";
import { CommentItemCard } from "../CommentItem/CommentItemCard";
import { CommentItemActions } from "../CommentItem/CommentItemActions";
import { CommentButton } from "../CommentButton";
import { Heart } from "lucide-react";
import { mocked } from "storybook/test";
import { getCommentWithReplies } from "@/lib/queries/comments";
import { CommentModalTrigger } from "../CommentModalTrigger";

const meta = {
  title: "components/comments/CommentList",
  component: CommentList,
  tags: ["autodocs"],
  args: {
    children: null,
  },
  beforeEach: () => {
    mocked(getCommentWithReplies).mockReturnValue(
      new Promise((res) => res(commentWithRepliesMock)),
    );
  },
  render: (args) => (
    <CommentList {...args}>
      {commentsMock.map((comment) => (
        <CommentItemCard>
          <CommentItem
            key={comment.id}
            comment={comment}
            renderActions={() => {
              const isLiked = comment && comment.likes.length > 0;

              return (
                <CommentItemActions>
                  <CommentModalTrigger commentId={comment.id} />
                  <CommentButton
                    icon={
                      <Heart size={16} strokeWidth={1.5} absoluteStrokeWidth />
                    }
                    label={comment._count.likes}
                    aria-label="Like comment"
                    color={isLiked ? "red" : "default"}
                    fill={isLiked}
                  />
                </CommentItemActions>
              );
            }}
          />
        </CommentItemCard>
      ))}
    </CommentList>
  ),
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
