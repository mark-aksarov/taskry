import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { ProjectDetailCard } from "@/components/projects/ProjectDetailCard";
import { ProjectDetailActions } from "@/components/projects/ProjectDetailActions";

interface ProjectPageProps {
  searchContainer: React.ReactNode;
  projectDetailContainer: React.ReactNode;
  projectHeaderContainer: React.ReactNode;
}

export function ProjectDetailPage({
  searchContainer,
  projectDetailContainer,
  projectHeaderContainer,
}: ProjectPageProps) {
  const t = useTranslations("app.ProjectDetailPage");

  return (
    <>
      <PageContainer>
        <ProjectDetailCard
          projectDetailContainer={projectDetailContainer}
          projectDetailHeaderContainer={projectHeaderContainer}
          projectDetailActions={<ProjectDetailActions />}
        />

        <PageGrid className="md:hidden">
          <ToolbarMobile
            firstSlot={
              <>
                <BackButton href="/projects" />
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              </>
            }
          />

          <div className="flex flex-col">{projectHeaderContainer}</div>
          <Card className="flex flex-col p-1.5">
            <ProjectDetailActions />
          </Card>
          <Card className="flex flex-col">{projectDetailContainer}</Card>
        </PageGrid>
      </PageContainer>

      <TaskSearchModal searchContainer={searchContainer} />
    </>
  );
}
