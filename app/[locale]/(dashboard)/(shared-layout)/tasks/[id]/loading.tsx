import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { TaskDetailAltSkeleton } from "@/components/tasks/TaskDetailAlt";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { TaskDetailActionsSkeleton } from "@/components/tasks/TaskDetailActions";

export default function AppTaskDetailLoading() {
  const t = useTranslations("app.TaskDetailPage");

  return (
    <PageContainer>
      <TaskDetailCard
        taskDetailContainer={<TaskDetailAltSkeleton />}
        taskDetailHeaderContainer={<DetailHeaderSkeleton />}
        taskDetailActions={<TaskDetailActionsSkeleton />}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton href="/tasks" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
        />

        <div className="flex flex-col">
          <DetailHeaderSkeleton />
        </div>
        <Card className="flex flex-col p-1.5">
          <TaskDetailActionsSkeleton />
        </Card>
        <Card className="flex flex-col">
          <TaskDetailAltSkeleton />
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
