import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { ProjectDetailCard } from "@/components/projects/ProjectDetailCard";
import { AppHeader } from "@/components/layout/AppHeader";

interface ProjectPageProps {
  projectDetailContainer: React.ReactNode;
  projectHeaderContainer: React.ReactNode;
  projectDetailActions: React.ReactNode;
  searchModal: React.ReactNode;
}

export function ProjectDetailPage({
  projectDetailContainer,
  projectHeaderContainer,
  projectDetailActions,
  searchModal,
}: ProjectPageProps) {
  const t = useTranslations("app.ProjectDetailPage");

  return (
    <>
      <AppHeader backButton heading={t("heading")} searchModal={searchModal} />
      <main>
        <PageContainer>
          <ProjectDetailCard
            projectDetail={projectDetailContainer}
            projectDetailHeader={projectHeaderContainer}
            projectDetailActions={projectDetailActions}
          />

          <PageGrid className="md:hidden">
            <ToolbarMobileTop>
              <BackButton />
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
