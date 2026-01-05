import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";
import { Suspense } from "react";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { DetailCardHeadingSkeleton } from "@/components/common/DetailCard";
import { ProjectDetailCard } from "@/components/projects/ProjectDetailCard";
import { ProjectDetailFormSkeleton } from "@/components/projects/ProjectDetailForm";
import { ProjectDetailFullSkeleton } from "@/components/projects/ProjectDetailFull/ProjectDetailFullSkeleton";
import { useTranslations } from "next-intl";

interface ProjectDetailPageProps {
  id: number;
  ProjectDetailCardHeadingContainer: React.ComponentType<{ id: number }>;
  ProjectDetailContainer: React.ComponentType<{
    id: number;
  }>;
  ProjectDetailFormContainer: React.ComponentType;
}

export function ProjectDetailPage({
  id,
  ProjectDetailCardHeadingContainer,
  ProjectDetailContainer,
  ProjectDetailFormContainer,
}: ProjectDetailPageProps) {
  const t = useTranslations("app.ProjectDetailPage");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <ProjectDetailCard
          projectDetailCardHeading={
            <Suspense fallback={<DetailCardHeadingSkeleton />}>
              <ProjectDetailCardHeadingContainer id={id} />
            </Suspense>
          }
          projectDetail={
            <Suspense fallback={<ProjectDetailFullSkeleton />}>
              <ProjectDetailContainer id={id} />
            </Suspense>
          }
          projectDetailForm={
            <Suspense fallback={<ProjectDetailFormSkeleton />}>
              <ProjectDetailFormContainer />
            </Suspense>
          }
        />
      </PageGrid>
    </PageContainer>
  );
}
