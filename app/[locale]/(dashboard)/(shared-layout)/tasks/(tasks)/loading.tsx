import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarDesktopButtonSkeleton,
  ToolbarMobileTopButtonSkeleton,
  ToolbarMobileBottomButtonSkeleton,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskListItemSkeleton } from "@/components/tasks/TaskListItem";

export default function AppTasksPageLoading() {
  const t = useTranslations("app.TasksPage");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarDesktop>
          <ToolbarDesktopButtonSkeleton />
          <ToolbarDesktopButtonSkeleton />
          <ToolbarDesktopButtonSkeleton />
          <ToolbarDesktopButtonSkeleton />
          <ToolbarDesktopButtonSkeleton className="ml-auto" />
          <ToolbarDesktopButtonSkeleton />
        </ToolbarDesktop>

        <ToolbarMobileTop>
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
          <ToolbarMobileTopButtonSkeleton />
          <ToolbarMobileTopButtonSkeleton />
          <ToolbarMobileTopButtonSkeleton />
          <ToolbarMobileTopButtonSkeleton />
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <ToolbarMobileBottomButtonSkeleton />
          <ToolbarMobileBottomButtonSkeleton className="ml-auto" />
        </ToolbarMobileBottom>

        <List>
          <Repeat
            items={10}
            renderItem={() => <TaskListItemSkeleton showCheckbox />}
          />
        </List>
      </PageGrid>
    </PageContainer>
  );
}
