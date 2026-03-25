import { ActionFn, ActionState } from "@/lib/actions/types";
import { ProjectStatus } from "@/generated/prisma/enums";

export interface BaseProjectItemProps {
  id: number;
  title: string;
  deadline: string;
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  commentsCount: number;
  status: ProjectStatus;
  updateProjectFormContainer: React.ReactNode;
  projectCommentsContainer: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
}
