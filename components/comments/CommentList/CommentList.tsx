"use client";

import { Comment } from "@/lib/queries/types";
import { CommentButton } from "../CommentButton";
import { CommentModalTrigger } from "../CommentModalTrigger";
import {
  CommentItem,
  CommentItemActions,
  CommentItemCard,
} from "../CommentItem";
import { Heart } from "lucide-react";

export function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentItemCard key={comment.id}>
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
    </div>
  );
}
