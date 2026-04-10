import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { PageContainer } from "@/components/common/PageContainer";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { ProjectDetailAltSkeleton } from "@/components/projects/ProjectDetailAlt";
import { ProjectDetailActionsSkeleton } from "@/components/projects/ProjectDetailActions";

export default function AppProjectDetailLoading() {
  const t = useTranslations("app.ProjectDetailPage");

  return (
    <PageContainer>
      <Card className="max-md:hidden">
        <ProjectDetailAltSkeleton />
      </Card>

      <PageGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/projects" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
        />

        <div>
          <DetailHeaderSkeleton />
        </div>
        <Card className="p-1.5">
          <ProjectDetailActionsSkeleton />
        </Card>
        <Card>
          <ProjectDetailAltSkeleton />
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
