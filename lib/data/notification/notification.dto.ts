import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export type NotificationListItemDTO = {
  id: number;
  type: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  isRead: boolean;

  actor?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };

  target?: {
    id: number;
    project?: {
      id: number;
      title: string;
      deadline: Date;
      status: ProjectStatus;
    };
    task?: { id: number; title: string; deadline: Date; status: TaskStatus };
    user?: { id: string; fullName: string };
    customer?: { id: number; fullName: string };
    comment?: {
      id: number;
      content: string;
      createdAt: Date;
      attachments: { id: number; fileUrl: string; fileName: string }[];
      project?: {
        id: number;
        title: string;
      };
      task?: { id: number; title: string };
    };
  };
};

export type NotificationsDTO = {
  items: NotificationListItemDTO[];
  totalCount: number;
  unreadCount: number;
};
