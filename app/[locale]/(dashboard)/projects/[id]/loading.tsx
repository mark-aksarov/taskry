import { useTranslations } from "next-intl";
import { BackButton } from "@/dashboard/common/BackButton";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { ProjectDetailCard } from "@/dashboard/projects/ProjectDetailCard";
import { ProjectDetailAltSkeleton } from "@/dashboard/projects/ProjectDetailAlt";
import { ProjectDetailCardHeaderSkeleton } from "@/dashboard/projects/ProjectDetailCard";

export default function AppProjectDetailLoading() {
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
        />

        <ProjectDetailCard
          projectDetailCardHeaderContainer={<ProjectDetailCardHeaderSkeleton />}
          projectDetailContainer={<ProjectDetailAltSkeleton />}
        />
      </DashboardGrid>
    </DashboardContainer>
  );
}
