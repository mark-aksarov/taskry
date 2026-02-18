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
import { TaskCategoryListItemSkeleton } from "@/components/taskCategory/TaskCategoryListItem";

export default function TaskCategoriesPageLoading() {
  const t = useTranslations("app.TaskCategoriesPageLoading");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarDesktop>
          <ToolbarDesktopButtonSkeleton />
          <ToolbarDesktopButtonSkeleton className="ml-auto" />
        </ToolbarDesktop>

        <ToolbarMobileTop>
          <ToolbarMobileHeading>{t("title")}</ToolbarMobileHeading>
          <ToolbarMobileTopButtonSkeleton />
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <ToolbarMobileBottomButtonSkeleton className="ml-auto" />
        </ToolbarMobileBottom>

        <List>
          <Repeat items={20} renderItem={TaskCategoryListItemSkeleton} />
        </List>
      </PageGrid>
    </PageContainer>
  );
}
