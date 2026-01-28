import { getAllComments } from "./comment.dal";
import { CommentListItemDTO } from "./comment.dto";
import { requireSession } from "../utils/requireSession";

export const getCommentList = async ({
  taskId,
  projectId,
}: {
  taskId?: number;
  projectId?: number;
}): Promise<CommentListItemDTO[]> => {
  const {
    user: { id: userId, role },
  } = await requireSession();

  const comments = await getAllComments(taskId, projectId);

  return comments.map((c) => {
    return {
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,

      canEdit: role === "owner" || c.sender.id === userId,

      sender: {
        id: c.sender.id,
        fullName: c.sender.fullName,
        imageUrl: c.sender.imageUrl ?? undefined,
      },

      attachments: c.attachments.map((a) => ({
        id: a.id,
        fileUrl: a.fileUrl,
      })),
    };
  });
};
