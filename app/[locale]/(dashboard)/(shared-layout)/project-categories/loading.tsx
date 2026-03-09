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
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { ProjectCategoryListItemSkeleton } from "@/components/projectCategory/ProjectCategoryListItem";

export default function AppProjectCategoriesPageLoading() {
  const t = useTranslations("app.ProjectCategoriesPage");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarDesktop>
          <ToolbarDesktopButtonSkeleton />
          <ToolbarDesktopButtonSkeleton className="ml-auto" />
        </ToolbarDesktop>

        <ToolbarMobileTop>
          <BackButton href="/projects" />
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
          <ToolbarMobileTopButtonSkeleton />
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <ToolbarMobileBottomButtonSkeleton className="ml-auto" />
        </ToolbarMobileBottom>

        <List>
          <Repeat items={107} renderItem={ProjectCategoryListItemSkeleton} />
        </List>
      </PageGrid>
    </PageContainer>
  );
}
