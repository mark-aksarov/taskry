import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import {
  AppHeader,
  AppHeaderContainerProps,
} from "@/components/layout/AppHeader";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { ProjectDetailCard } from "@/components/projects/ProjectDetailCard";
import { ProjectDetailAltSkeleton } from "@/components/projects/ProjectDetailAlt";
import { ProjectDetailActionsSkeleton } from "@/components/projects/ProjectDetailActions";

export default function ProjectDetailLoading({
  appHeaderProps,
}: {
  appHeaderProps: AppHeaderContainerProps;
}) {
  const t = useTranslations("app.ProfilePage");

  return (
    <>
      <AppHeader
        {...appHeaderProps}
        backButtonHref="/projects"
        heading={t("heading")}
      />
      <main>
        <PageContainer>
          <ProjectDetailCard
            projectDetailContainer={<ProjectDetailAltSkeleton />}
            projectDetailHeaderContainer={<DetailHeaderSkeleton />}
            projectDetailActions={<ProjectDetailActionsSkeleton />}
          />

          <PageGrid className="md:hidden">
            <ToolbarMobileTop>
              <BackButton href="/projects" />
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            </ToolbarMobileTop>

            <div className="flex flex-col">
              <ProjectDetailAltSkeleton />
            </div>
            <Card className="flex flex-col p-1.5">
              <DetailHeaderSkeleton />
            </Card>
            <Card className="flex flex-col">
              <ProjectDetailActionsSkeleton />
            </Card>
          </PageGrid>
        </PageContainer>
      </main>
    </>
  );
}
