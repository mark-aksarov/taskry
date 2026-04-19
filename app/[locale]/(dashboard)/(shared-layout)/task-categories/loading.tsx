import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ButtonSkeleton } from "@/components/ui/Skeleton";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { ToolbarLarge, ToolbarMobile } from "@/components/common/Toolbar";
import { TaskCategoryGridSkeleton } from "@/components/taskCategory/TaskCategoryGrid";

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
