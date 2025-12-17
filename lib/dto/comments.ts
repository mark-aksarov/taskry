export interface CommentDTO {
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

  repliesCount: number;
}
