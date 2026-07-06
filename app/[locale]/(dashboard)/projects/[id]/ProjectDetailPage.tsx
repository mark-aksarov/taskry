import { useTranslations } from "next-intl";
import { BackButton } from "@/dashboard/common/BackButton";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { ProjectDetailCard } from "@/dashboard/projects/ProjectDetailCard";
import { DeleteProjectModalTrigger } from "@/dashboard/projects/DeleteProjectModalTrigger";

interface ProjectPageProps {
  projectDetailCardHeaderContainer: React.ReactNode;
  projectDetailContainer: React.ReactNode;
}

export function ProjectDetailPage({
  projectDetailCardHeaderContainer,
  projectDetailContainer,
}: ProjectPageProps) {
  const t = useTranslations("app.ProjectDetailPage");

  return (
    <DashboardContainer>
      <DashboardGrid>
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/projects" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
          secondSlot={<DeleteProjectModalTrigger buttonVariant="secondary" />}
        />

        <ProjectDetailCard
          projectDetailCardHeaderContainer={projectDetailCardHeaderContainer}
          projectDetailContainer={projectDetailContainer}
        />
      </DashboardGrid>
    </DashboardContainer>
  );
}
