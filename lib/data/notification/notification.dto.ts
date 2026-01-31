import { NotificationType } from "@/generated/prisma/enums";

export type NotificationListItemDTO = {
  id: number;
  type: NotificationType;
  createdAt: Date;
  isRead: boolean;

  actor?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };

  project?: {
    id: number;
    title: string;
  };

  task?: {
    id: number;
    title: string;
  };

  user?: {
    id: string;
    fullName: string;
  };

  customer?: {
    id: number;
    fullName: string;
  };

  company?: {
    id: number;
    name: string;
  };

  projectCategory?: {
    id: number;
    name: string;
  };

  taskCategory?: {
    id: number;
    name: string;
  };

  position?: {
    id: number;
    name: string;
  };

  subtask?: {
    id: number;
    text: string;
  };

  comment?: {
    id: number;
    content: string;
  };

  projectTitle?: string;
  taskTitle?: string;
  userFullName?: string;
  customerFullName?: string;
  commentContent?: string;
  companyName?: string;
  positionName?: string;
  subtaskText?: string;
  projectCategoryName?: string;
  taskCategoryName?: string;
};

export type NotificationsDTO = {
  items: NotificationListItemDTO[];
  totalCount: number;
  unreadCount: number;
};
