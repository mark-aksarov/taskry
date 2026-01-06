import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";
import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { ProjectDetailCard } from "@/components/projects/ProjectDetailCard";

interface ProjectDetailPageProps {
  projectDetailCardHeadingContainer: React.ReactNode;
  projectDetailContainer: React.ReactNode;
  projectDetailFormContainer: React.ReactNode;
}

export function ProjectDetailPage({
  projectDetailCardHeadingContainer,
  projectDetailContainer,
  projectDetailFormContainer,
}: ProjectDetailPageProps) {
  const t = useTranslations("app.ProjectDetailPage");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <ProjectDetailCard
          projectDetailCardHeading={projectDetailCardHeadingContainer}
          projectDetail={projectDetailContainer}
          projectDetailForm={projectDetailFormContainer}
        />
      </PageGrid>
    </PageContainer>
  );
}
