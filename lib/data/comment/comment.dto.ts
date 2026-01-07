export interface CommentListItemDTO {
  id: number;
  content: string;
  createdAt: Date;

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
