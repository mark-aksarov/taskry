import { useTranslations } from "next-intl";
import { ButtonSkeleton } from "@/ui/Skeleton";
import { BackButton } from "@/dashboard/common/BackButton";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { ProjectCategoryGridSkeleton } from "@/dashboard/projectCategory/ProjectCategoryGrid";

export default function AppProjectCategoriesPageLoading() {
  const t = useTranslations("app.ProjectCategoriesPage");

  return (
    <DashboardContainer>
      <DashboardGrid>
        <ToolbarLarge
          firstSlot={
            <>
              <ButtonSkeleton className="w-[5rem]" />
              <ButtonSkeleton className="w-[5rem]" />
            </>
          }
          secondSlot={<ButtonSkeleton className="w-[5rem]" />}
        />

        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/projects" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
          secondSlot={
            <>
              <ButtonSkeleton className="w-8" />
              <ButtonSkeleton className="w-8" />
            </>
          }
        />

        <ProjectCategoryGridSkeleton />
      </DashboardGrid>
    </DashboardContainer>
  );
}
