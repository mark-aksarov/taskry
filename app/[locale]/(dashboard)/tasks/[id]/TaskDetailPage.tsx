import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import {
  AppHeader,
  AppHeaderContainerProps,
} from "@/components/layout/AppHeader";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { EditTaskModal } from "@/components/tasks/EditTaskModal";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard";
import { TaskDetailActions } from "@/components/tasks/TaskDetailActions";
import { ActionFn, ActionState, DeleteTaskPayload } from "@/lib/actions/types";

interface TaskDetailPageProps {
  taskId: number;
  taskTitle: string;
  taskDetailContainer: React.ReactNode;
  taskHeaderContainer: React.ReactNode;
  editTaskFormContainer: React.ReactNode;
  taskCommentsContainer: React.ReactNode;
  appHeaderProps: AppHeaderContainerProps;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  deleteTask: ActionFn<ActionState, DeleteTaskPayload>;
}

export function TaskDetailPage({
  taskId,
  taskTitle,
  taskDetailContainer,
  taskHeaderContainer,
  editTaskFormContainer,
  taskCommentsContainer,
  appHeaderProps,
  sendComment,
  updateComment,
  deleteTask,
}: TaskDetailPageProps) {
  const t = useTranslations("app.TaskDetailPage");

  const taskDetailActions = (
    <TaskDetailActions
      taskId={taskId}
      taskTitle={taskTitle}
      taskCommentsContainer={taskCommentsContainer}
      sendComment={sendComment}
      updateComment={updateComment}
    />
  );

  return (
    <>
      <AppHeader
        {...appHeaderProps}
        backButtonHref="/tasks"
        heading={t("heading")}
      />
      <main>
        <PageContainer>
          <TaskDetailCard
            taskDetailContainer={taskDetailContainer}
            taskDetailHeaderContainer={taskHeaderContainer}
            taskDetailActions={taskDetailActions}
          />

          <PageGrid className="md:hidden">
            <ToolbarMobileTop>
              <BackButton href="/tasks" />
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            </ToolbarMobileTop>

            <div className="flex flex-col">{taskHeaderContainer}</div>
            <Card className="flex flex-col p-1.5">{taskDetailActions}</Card>
            <Card className="flex flex-col">{taskDetailContainer}</Card>
          </PageGrid>
        </PageContainer>

        <EditTaskModal editTaskFormContainer={editTaskFormContainer} />
      </main>
    </>
  );
}
