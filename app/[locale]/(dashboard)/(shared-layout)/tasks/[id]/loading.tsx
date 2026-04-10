import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { TaskDetailAltSkeleton } from "@/components/tasks/TaskDetailAlt";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { TaskDetailActionsSkeleton } from "@/components/tasks/TaskDetailActions";

export default function AppTaskDetailLoading() {
  const t = useTranslations("app.TaskDetailPage");

  return (
    <PageContainer>
      <Card className="max-md:hidden">
        <TaskDetailAltSkeleton />
      </Card>

      <PageGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/tasks" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
        />

        <div>
          <DetailHeaderSkeleton />
        </div>
        <Card className="p-1.5">
          <TaskDetailActionsSkeleton />
        </Card>
        <Card>
          <TaskDetailAltSkeleton />
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
