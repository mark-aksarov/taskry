import { mockedCommentList } from "@/mocks/comments";
import { CommentItem } from "../../CommentItem";

export function getCommentList() {
  return mockedCommentList.map((comment) => (
    <CommentItem key={comment.id} guestMode canEdit {...comment} />
  ));
}
