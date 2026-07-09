import {
  ToolbarLarge,
  ToolbarMobile,
  ToolbarSearchMobile,
  ToolbarFiltersMobile,
} from "@/dashboard/common/Toolbar";

import { Skeleton } from "@/ui/Skeleton";
import { useTranslations } from "next-intl";
import { ButtonSkeleton } from "@/ui/Skeleton";
import { TaskGridSkeleton } from "@/dashboard/tasks/TaskGrid";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { SearchModalTriggerSkeleton } from "@/dashboard/search/SearchModalTrigger";

export default function AppTasksPageLoading() {
  const t = useTranslations("app.TasksPage");

  return (
    <DashboardContainer>
      <DashboardGrid>
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

        <TaskGridSkeleton viewMode="list" showCheckbox={true} />
      </DashboardGrid>
    </DashboardContainer>
  );
}
