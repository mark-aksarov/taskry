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
