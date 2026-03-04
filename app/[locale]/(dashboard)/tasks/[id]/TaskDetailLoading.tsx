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
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { TaskDetailAltSkeleton } from "@/components/tasks/TaskDetailAlt";
import { TaskDetailActionsSkeleton } from "@/components/tasks/TaskDetailActions";

export default function TaskDetailLoading({
  appHeaderProps,
}: {
  appHeaderProps: AppHeaderContainerProps;
}) {
  const t = useTranslations("app.ProfilePage");

  return (
    <>
      <AppHeader
        {...appHeaderProps}
        backButtonHref="/tasks"
        heading={t("heading")}
      />
      <main>
        <PageContainer>
          <TaskDetailCard
            taskDetailContainer={<TaskDetailAltSkeleton />}
            taskDetailHeaderContainer={<DetailHeaderSkeleton />}
            taskDetailActions={<TaskDetailActionsSkeleton />}
          />

          <PageGrid className="md:hidden">
            <ToolbarMobileTop>
              <BackButton href="/tasks" />
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            </ToolbarMobileTop>

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
      </main>
    </>
  );
}
