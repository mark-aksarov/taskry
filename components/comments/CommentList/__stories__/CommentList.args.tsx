import { mockedCommentList } from "@/mocks/comments";
import { CommentItem } from "../../CommentItem";

export function getCommentList() {
  return mockedCommentList.map((comment) => (
    <CommentItem
      key={comment.id}
      deleteComment={() => ({ status: "success" })}
      canEdit
      {...comment}
    />
  ));
}
