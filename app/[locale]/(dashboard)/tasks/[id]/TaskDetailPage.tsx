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
import { ActionFn, ActionState } from "@/lib/actions/types";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard";
import { TaskDetailActions } from "@/components/tasks/TaskDetailActions";

interface TaskDetailPageProps {
  guestMode: boolean;
  taskId: number;
  taskTitle: string;
  taskDetailContainer: React.ReactNode;
  taskHeaderContainer: React.ReactNode;
  editTaskFormContainer: React.ReactNode;
  taskCommentsContainer: React.ReactNode;
  appHeaderProps: AppHeaderContainerProps;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  deleteTask: ActionFn<ActionState, number[]>;
}

export function TaskDetailPage({
  guestMode,
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
      guestMode={guestMode}
      taskId={taskId}
      taskTitle={taskTitle}
      editTaskFormContainer={editTaskFormContainer}
      taskCommentsContainer={taskCommentsContainer}
      deleteTask={deleteTask}
      sendComment={sendComment}
      updateComment={updateComment}
    />
  );

  return (
    <>
      <AppHeader {...appHeaderProps} backButton heading={t("heading")} />
      <main>
        <PageContainer>
          <TaskDetailCard
            taskDetailContainer={taskDetailContainer}
            taskDetailHeaderContainer={taskHeaderContainer}
            taskDetailActions={taskDetailActions}
          />

          <PageGrid className="md:hidden">
            <ToolbarMobileTop>
              <BackButton />
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            </ToolbarMobileTop>

            <div className="flex flex-col px-1.5">{taskHeaderContainer}</div>
            <Card className="flex flex-col px-1.5">{taskDetailActions}</Card>
            <Card className="flex flex-col">{taskDetailContainer}</Card>
          </PageGrid>
        </PageContainer>
      </main>
    </>
  );
}
