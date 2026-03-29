import { TaskStatus } from "@/generated/prisma/enums";

export interface BaseTaskItemProps {
  id: number;
  title: string;
  deadline: string;
  assignee?: {
    id: string;
    imageUrl?: string;
    fullName: string;
  };
  commentsCount: number;
  status: TaskStatus;
}
