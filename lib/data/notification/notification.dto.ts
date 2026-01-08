import {
  TaskStatus,
  ProjectStatus,
  NotificationType,
} from "@/generated/prisma/enums";

export type NotificationListItemDTO = {
  id: number;
  type: NotificationType;
  createdAt: Date;
  updatedAt: Date;
  isRead: boolean;

  actor?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };

  project?: {
    id: number;
    title: string;
    deadline: Date;
    status: ProjectStatus;
  };

  task?: { id: number; title: string; deadline: Date; status: TaskStatus };

  comment?: {
    id: number;
    content: string;
  };

  projectTitle?: string;
  taskTitle?: string;
  projectDeadline?: Date;
  taskDeadline?: Date;
  projectStatus?: ProjectStatus;
  taskStatus?: TaskStatus;
  commentContent?: string;
};

export type NotificationsDTO = {
  items: NotificationListItemDTO[];
  totalCount: number;
  unreadCount: number;
};
