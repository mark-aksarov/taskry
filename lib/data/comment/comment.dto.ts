export interface CommentListItemDTO {
  id: number;
  content: string;
  createdAt: Date;

  canEdit: boolean;

  sender: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };

  attachments: {
    id: number;
    fileUrl: string;
  }[];
}

export interface CreateCommentInputDTO {
  content: string;
  taskId?: number;
  projectId?: number;
  attachments?: {
    fileUrl: string;
    fileName: string;
  }[];
}

export interface UpdateCommentInputDTO {
  id: number;
  content: string;
}
