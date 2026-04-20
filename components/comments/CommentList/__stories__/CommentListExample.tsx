import { CommentList } from "../CommentList";
import { CommentItem } from "../../CommentItem";
import { mockedCommentList } from "@/mocks/comments";

export function CommentListExample() {
  return (
    <CommentList>
      {mockedCommentList.map((comment) => (
        <CommentItem key={comment.id} {...comment} canEdit />
      ))}
    </CommentList>
  );
}
