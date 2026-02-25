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
import { UserListItemSkeleton } from "@/components/users/UserListItem";

export default function UsersPageLoading() {
  const t = useTranslations("app.UsersPageLoading");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarDesktop>
          <ToolbarDesktopButtonSkeleton />
          <ToolbarDesktopButtonSkeleton />
          <ToolbarDesktopButtonSkeleton />
          <ToolbarDesktopButtonSkeleton className="ml-auto" />
          <ToolbarDesktopButtonSkeleton />
        </ToolbarDesktop>

        <ToolbarMobileTop>
          <ToolbarMobileHeading>{t("title")}</ToolbarMobileHeading>
          <ToolbarMobileTopButtonSkeleton />
          <ToolbarMobileTopButtonSkeleton />
          <ToolbarMobileTopButtonSkeleton />
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <ToolbarMobileBottomButtonSkeleton />
          <ToolbarMobileBottomButtonSkeleton className="ml-auto" />
        </ToolbarMobileBottom>

        <List>
          <Repeat items={20} renderItem={() => <UserListItemSkeleton />} />
        </List>
      </PageGrid>
    </PageContainer>
  );
}
