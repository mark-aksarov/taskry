import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import {
  AppHeader,
  AppHeaderContainerProps,
} from "@/components/layout/AppHeader";

import {
  ActionFn,
  ActionState,
  DeleteProjectPayload,
} from "@/lib/actions/types";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { ProjectDetailCard } from "@/components/projects/ProjectDetailCard";
import { ProjectDetailActions } from "@/components/projects/ProjectDetailActions";
import { EditProjectModal } from "@/components/projects/EditProjectModal";

interface ProjectPageProps {
  projectId: number;
  projectTitle: string;
  projectDetailContainer: React.ReactNode;
  projectHeaderContainer: React.ReactNode;
  projectCommentsContainer: React.ReactNode;
  editProjectFormContainer: React.ReactNode;
  appHeaderProps: AppHeaderContainerProps;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  deleteProject: ActionFn<ActionState, DeleteProjectPayload>;
}

export function ProjectDetailPage({
  projectId,
  projectTitle,
  projectDetailContainer,
  projectHeaderContainer,
  projectCommentsContainer,
  editProjectFormContainer,
  appHeaderProps,
  sendComment,
  updateComment,
  deleteProject,
}: ProjectPageProps) {
  const t = useTranslations("app.ProjectDetailPage");

  const projectDetailActions = (
    <ProjectDetailActions
      deleteProject={deleteProject}
      projectId={projectId}
      projectTitle={projectTitle}
      sendComment={sendComment}
      updateComment={updateComment}
      projectCommentsContainer={projectCommentsContainer}
    />
  );

  return (
    <>
      <AppHeader
        {...appHeaderProps}
        backButtonHref="/projects"
        heading={t("heading")}
      />
      <main>
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

        <EditProjectModal editProjectFormContainer={editProjectFormContainer} />
      </main>
    </>
  );
}
