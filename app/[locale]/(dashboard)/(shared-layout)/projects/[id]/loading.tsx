import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { PageContainer } from "@/components/common/PageContainer";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { ProjectDetailCard } from "@/components/projects/ProjectDetailCard";
import { ProjectDetailAltSkeleton } from "@/components/projects/ProjectDetailAlt";
import { ProjectDetailActionsSkeleton } from "@/components/projects/ProjectDetailActions";

export default function AppProjectDetailLoading() {
  const t = useTranslations("app.ProjectDetailPage");

  return (
    <PageContainer>
      <ProjectDetailCard
        projectDetailContainer={<ProjectDetailAltSkeleton />}
        projectDetailHeaderContainer={<DetailHeaderSkeleton />}
        projectDetailActions={<ProjectDetailActionsSkeleton />}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/projects" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
        />

        <div className="flex flex-col">
          <DetailHeaderSkeleton />
        </div>
        <Card className="flex flex-col p-1.5">
          <ProjectDetailActionsSkeleton />
        </Card>
        <Card className="flex flex-col">
          <ProjectDetailAltSkeleton />
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
