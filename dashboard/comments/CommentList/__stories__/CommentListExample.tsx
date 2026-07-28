import { CommentList } from "../CommentList";
import { CommentItem } from "../../CommentItem";
import { mockedCommentList } from "@/mocks/comments";
import { DeleteCommentProvider } from "../../DeleteCommentContext";

export function CommentListExample() {
  return (
    <CommentList>
      {mockedCommentList.map((comment) => (
        <DeleteCommentProvider>
          <CommentItem key={comment.id} {...comment} canEdit />
        </DeleteCommentProvider>
      ))}
    </CommentList>
  );
}
