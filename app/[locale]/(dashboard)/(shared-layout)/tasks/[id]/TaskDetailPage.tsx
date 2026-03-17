import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { BackButton } from "@/components/common/BackButton";
import { EditTaskModal } from "@/components/tasks/EditTaskModal";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { TaskDetailActions } from "@/components/tasks/TaskDetailActions";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";

interface TaskDetailPageProps {
  taskId: number;
  taskTitle: string;
  searchContainer: React.ReactNode;
  taskDetailContainer: React.ReactNode;
  taskHeaderContainer: React.ReactNode;
  editTaskFormContainer: React.ReactNode;
  taskCommentsContainer: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
}

export function TaskDetailPage({
  taskId,
  taskTitle,
  searchContainer,
  taskDetailContainer,
  taskHeaderContainer,
  editTaskFormContainer,
  taskCommentsContainer,
  sendComment,
  updateComment,
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
      <PageContainer>
        <TaskDetailCard
          taskDetailContainer={taskDetailContainer}
          taskDetailHeaderContainer={taskHeaderContainer}
          taskDetailActions={taskDetailActions}
        />

        <PageGrid className="md:hidden">
          <ToolbarMobile
            firstSlot={
              <>
                <BackButton href="/tasks" />
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              </>
            }
          />

          <div className="flex flex-col">{taskHeaderContainer}</div>
          <Card className="flex flex-col p-1.5">{taskDetailActions}</Card>
          <Card className="flex flex-col">{taskDetailContainer}</Card>
        </PageGrid>
      </PageContainer>

      <TaskSearchModal searchContainer={searchContainer} />
      <EditTaskModal editTaskFormContainer={editTaskFormContainer} />
    </>
  );
}
