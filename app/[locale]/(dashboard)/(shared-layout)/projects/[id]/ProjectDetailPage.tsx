import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { ProjectDetailCard } from "@/components/projects/ProjectDetailCard";
import { DeleteProjectModalTrigger } from "@/components/projects/DeleteProjectModalTrigger";

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
          secondSlot={<DeleteProjectModalTrigger />}
        />

        <ProjectDetailCard
          projectDetailCardHeaderContainer={projectDetailCardHeaderContainer}
          projectDetailContainer={projectDetailContainer}
        />
      </PageGrid>
    </PageContainer>
  );
}
