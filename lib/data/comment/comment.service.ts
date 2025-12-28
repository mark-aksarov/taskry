import { getAllComments } from "./comment.dal";
import { CommentListItemDTO } from "./comment.dto";

export const getCommentList = async ({
  taskId,
  projectId,
}: {
  taskId?: number;
  projectId?: number;
}): Promise<CommentListItemDTO[]> => {
  const comments = await getAllComments(taskId, projectId);

  return comments.map((c) => {
    return {
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      sender: {
        id: c.sender.id,
        fullName: c.sender.fullName,
        imageUrl: c.sender.imageUrl ?? undefined,
      },
      attachments: c.attachments.map((a) => ({
        id: a.id,
        fileUrl: a.fileUrl,
      })),
      repliesCount: c._count.replies,
    };
  });
};
