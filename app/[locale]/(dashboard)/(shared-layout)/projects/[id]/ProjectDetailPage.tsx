import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { EditProjectModal } from "@/components/projects/EditProjectModal";
import { ProjectDetailCard } from "@/components/projects/ProjectDetailCard";
import { ProjectDetailActions } from "@/components/projects/ProjectDetailActions";

interface ProjectPageProps {
  projectId: number;
  projectTitle: string;
  searchContainer: React.ReactNode;
  projectDetailContainer: React.ReactNode;
  projectHeaderContainer: React.ReactNode;
  projectCommentsContainer: React.ReactNode;
  editProjectFormContainer: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
}

export function ProjectDetailPage({
  projectId,
  projectTitle,
  searchContainer,
  projectDetailContainer,
  projectHeaderContainer,
  projectCommentsContainer,
  editProjectFormContainer,
  sendComment,
  updateComment,
}: ProjectPageProps) {
  const t = useTranslations("app.ProjectDetailPage");

  const projectDetailActions = (
    <ProjectDetailActions
      projectId={projectId}
      projectTitle={projectTitle}
      sendComment={sendComment}
      updateComment={updateComment}
      projectCommentsContainer={projectCommentsContainer}
    />
  );

  return (
    <>
      <PageContainer>
        <ProjectDetailCard
          projectDetailContainer={projectDetailContainer}
          projectDetailHeaderContainer={projectHeaderContainer}
          projectDetailActions={projectDetailActions}
        />

        <PageGrid className="md:hidden">
          <ToolbarMobileTop>
            <BackButton href="/projects" />
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
          </ToolbarMobileTop>

          <div className="flex flex-col">{projectHeaderContainer}</div>
          <Card className="flex flex-col p-1.5">{projectDetailActions}</Card>
          <Card className="flex flex-col">{projectDetailContainer}</Card>
        </PageGrid>
      </PageContainer>

      <TaskSearchModal searchContainer={searchContainer} />
      <EditProjectModal editProjectFormContainer={editProjectFormContainer} />
    </>
  );
}
