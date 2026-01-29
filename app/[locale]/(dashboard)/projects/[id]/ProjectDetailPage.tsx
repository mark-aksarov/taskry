import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { ProjectDetailCard } from "@/components/projects/ProjectDetailCard";
import { ProjectDetailActions } from "@/components/projects/ProjectDetailActions";

interface ProjectPageProps {
  projectDetailContainer: React.ReactNode;
  projectHeaderContainer: React.ReactNode;
}

export function ProjectDetailPage({
  projectDetailContainer,
  projectHeaderContainer,
}: ProjectPageProps) {
  const t = useTranslations("app.ProjectDetailPage");

  return (
    <PageContainer>
      <ProjectDetailCard
        projectDetail={projectDetailContainer}
        projectDetailHeader={projectHeaderContainer}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <div className="flex flex-col px-1.5">{projectHeaderContainer}</div>

        <Card className="flex flex-col px-1.5">
          <ProjectDetailActions />
        </Card>

        <Card className="flex flex-col">{projectDetailContainer}</Card>
      </PageGrid>
    </PageContainer>
  );
}
