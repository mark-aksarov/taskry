import {
  ToolbarLarge,
  ToolbarMobile,
  ToolbarSearchMobile,
  ToolbarFiltersMobile,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/Skeleton";
import { PageGrid } from "@/components/common/PageGrid";
import { ButtonSkeleton } from "@/components/ui/Skeleton";
import { TaskListSkeleton } from "@/components/tasks/TaskList";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskGridMobileSkeleton } from "@/components/tasks/TaskGrid";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { SearchModalTriggerSkeleton } from "@/components/search/SearchModalTrigger";

export default function AppTasksPageLoading() {
  const t = useTranslations("app.TasksPage");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarLarge
          firstSlot={
            <>
              <ButtonSkeleton className="w-[5rem]" />
              <ButtonSkeleton className="w-[5rem]" />
              <ButtonSkeleton className="w-[5rem]" />
              <ButtonSkeleton className="w-[5rem]" />
            </>
          }
          secondSlot={
            <>
              <ButtonSkeleton className="w-[5rem]" />
              <ButtonSkeleton className="w-[5rem]" />
            </>
          }
          twoRowsOnLg
        />

        <ToolbarMobile
          firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
          secondSlot={
            <>
              <ButtonSkeleton className="w-8" />
              <ButtonSkeleton className="w-8" />
            </>
          }
        />

        <ToolbarSearchMobile>
          <SearchModalTriggerSkeleton />
        </ToolbarSearchMobile>

        <ToolbarFiltersMobile>
          <ButtonSkeleton className="w-[5rem] rounded-full" />
          <ButtonSkeleton className="w-[5rem] rounded-full" />
          <ButtonSkeleton className="w-[5rem] rounded-full" />
          <ButtonSkeleton className="w-[5rem] rounded-full" />
        </ToolbarFiltersMobile>

        <ToolbarMobile
          firstSlot={<Skeleton size="xs" className="w-[5rem]" />}
          secondSlot={<ButtonSkeleton ghost className="w-[7rem]" />}
        />

        <TaskListSkeleton className="max-md:hidden" items={10} />
        <TaskGridMobileSkeleton className="md:hidden" items={10} />
      </PageGrid>
    </PageContainer>
  );
}
