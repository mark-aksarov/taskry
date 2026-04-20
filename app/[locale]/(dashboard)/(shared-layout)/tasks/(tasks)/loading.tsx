import {
  ToolbarLarge,
  ToolbarMobile,
  ToolbarSearchMobile,
  ToolbarFiltersMobile,
} from "@/dashboard/common/Toolbar";

import { useTranslations } from "next-intl";
import { Skeleton } from "@/ui/Skeleton";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { ButtonSkeleton } from "@/ui/Skeleton";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { TaskGridSkeleton } from "@/dashboard/tasks/TaskGridSkeleton";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { SearchModalTriggerSkeleton } from "@/dashboard/search/SearchModalTrigger";

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

        <TaskGridSkeleton viewMode="list" showCheckbox={true} />
      </PageGrid>
    </PageContainer>
  );
}
