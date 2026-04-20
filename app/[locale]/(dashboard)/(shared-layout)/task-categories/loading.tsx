import { useTranslations } from "next-intl";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { ButtonSkeleton } from "@/ui/Skeleton";
import { BackButton } from "@/dashboard/common/BackButton";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { TaskCategoryGridSkeleton } from "@/dashboard/taskCategory/TaskCategoryGrid";

export default function AppTaskCategoriesPageLoading() {
  const t = useTranslations("app.TaskCategoriesPage");

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
              <BackButton fallbackHref="/tasks" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
          secondSlot={<ButtonSkeleton className="w-8" />}
        />

        <TaskCategoryGridSkeleton />
      </PageGrid>
    </PageContainer>
  );
}
