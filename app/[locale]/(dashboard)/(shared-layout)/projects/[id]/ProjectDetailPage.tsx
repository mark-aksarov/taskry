import { useTranslations } from "next-intl";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { BackButton } from "@/dashboard/common/BackButton";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
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
    <PageContainer>
      <PageGrid>
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
      </PageGrid>
    </PageContainer>
  );
}
