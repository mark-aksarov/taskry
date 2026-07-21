export interface CommentDTO {
  id: number;
  content: string;
  taskId?: number;
  projectId?: number;
  senderId?: string;
}

export interface CommentListItemDTO {
  id: number;
  content: string;
  createdAt: string;

  canEdit: boolean;

  sender: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
}

export interface CreateCommentInputDTO {
  content: string;
  taskId?: number;
  projectId?: number;
}

export interface UpdateCommentInputDTO {
  id: number;
  content: string;
}

export function toCommentDTO(comment: {
  id: number;
  content: string;
  taskId: number | null;
  projectId: number | null;
  senderId: string | null;
}): CommentDTO {
  return {
    id: comment.id,
    content: comment.content,
    taskId: comment.taskId ?? undefined,
    projectId: comment.projectId ?? undefined,
    senderId: comment.senderId ?? undefined,
  };
}
