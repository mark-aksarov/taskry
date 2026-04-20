import { useTranslations } from "next-intl";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { ButtonSkeleton } from "@/ui/Skeleton";
import { BackButton } from "@/dashboard/common/BackButton";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { ProjectCategoryGridSkeleton } from "@/dashboard/projectCategory/ProjectCategoryGrid";

export default function AppProjectCategoriesPageLoading() {
  const t = useTranslations("app.ProjectCategoriesPage");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarLarge
          firstSlot={<ButtonSkeleton className="w-[5rem]" />}
          secondSlot={<ButtonSkeleton className="w-[5rem]" />}
        />

        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/projects" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
          secondSlot={<ButtonSkeleton className="w-8" />}
        />

        <ProjectCategoryGridSkeleton />
      </PageGrid>
    </PageContainer>
  );
}
