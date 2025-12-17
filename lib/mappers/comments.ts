import { CommentDTO } from "../dto/comments";
import { CommentType } from "../types/comments";

export function mapCommentToDTO(comment: CommentType): CommentDTO {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    sender: {
      id: comment.sender.id,
      fullName: comment.sender.fullName,
      imageUrl: comment.sender.imageUrl ?? undefined,
    },
    attachments: comment.attachments,
    repliesCount: comment._count.replies,
  };
}
