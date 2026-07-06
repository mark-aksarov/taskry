import { useTranslations } from "next-intl";
import { ButtonSkeleton } from "@/ui/Skeleton";
import { BackButton } from "@/dashboard/common/BackButton";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { TaskCategoryGridSkeleton } from "@/dashboard/taskCategory/TaskCategoryGrid";

export default function AppTaskCategoriesPageLoading() {
  const t = useTranslations("app.TaskCategoriesPage");

  return (
    <DashboardContainer>
      <DashboardGrid>
        <ToolbarLarge
          firstSlot={<ButtonSkeleton className="w-[5rem]" />}
          secondSlot={<ButtonSkeleton className="w-[5rem]" />}
        />

        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/tasks" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
          secondSlot={<ButtonSkeleton className="w-8" />}
        />

        <TaskCategoryGridSkeleton />
      </DashboardGrid>
    </DashboardContainer>
  );
}
