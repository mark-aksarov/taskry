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
import { ProjectDetailCard } from "@/components/projects/ProjectDetailCard";
import { ProjectDetailActions } from "@/components/projects/ProjectDetailActions";

interface ProjectPageProps {
  guestMode: boolean;
  projectId: number;
  projectTitle: string;
  projectDetailContainer: React.ReactNode;
  projectHeaderContainer: React.ReactNode;
  projectCommentsContainer: React.ReactNode;
  editProjectFormContainer: React.ReactNode;
  appHeaderProps: AppHeaderContainerProps;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  deleteProject: ActionFn<ActionState, number[]>;
}

export function ProjectDetailPage({
  guestMode,
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
      guestMode={guestMode}
      projectId={projectId}
      projectTitle={projectTitle}
      sendComment={sendComment}
      updateComment={updateComment}
      deleteProject={deleteProject}
      projectCommentsContainer={projectCommentsContainer}
      editProjectFormContainer={editProjectFormContainer}
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

            <div className="flex flex-col px-1.5">{projectHeaderContainer}</div>
            <Card className="flex flex-col px-1.5">{projectDetailActions}</Card>
            <Card className="flex flex-col">{projectDetailContainer}</Card>
          </PageGrid>
        </PageContainer>
      </main>
    </>
  );
}
