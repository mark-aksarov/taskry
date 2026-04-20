import { useTranslations } from "next-intl";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { BackButton } from "@/dashboard/common/BackButton";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { ProjectDetailCard } from "@/dashboard/projects/ProjectDetailCard";
import { ProjectDetailAltSkeleton } from "@/dashboard/projects/ProjectDetailAlt";
import { ProjectDetailCardHeaderSkeleton } from "@/dashboard/projects/ProjectDetailCard";

export default function AppProjectDetailLoading() {
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
        />

        <ProjectDetailCard
          projectDetailCardHeaderContainer={<ProjectDetailCardHeaderSkeleton />}
          projectDetailContainer={<ProjectDetailAltSkeleton />}
        />
      </PageGrid>
    </PageContainer>
  );
}
