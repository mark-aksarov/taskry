import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
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
      <Card className="max-md:hidden">{projectDetailContainer}</Card>

      <PageGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/projects" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
        />

        <div>{projectHeaderContainer}</div>
        <Card className="p-1.5">
          <ProjectDetailActions />
        </Card>
        <Card>{projectDetailContainer}</Card>
      </PageGrid>
    </PageContainer>
  );
}
