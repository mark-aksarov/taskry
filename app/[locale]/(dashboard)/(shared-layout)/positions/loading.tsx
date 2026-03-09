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
import { PositionListItemSkeleton } from "@/components/position/PositionListItem";

export default function AppPositionsPageLoading() {
  const t = useTranslations("app.PositionsPage");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarDesktop>
          <ToolbarDesktopButtonSkeleton />
          <ToolbarDesktopButtonSkeleton className="ml-auto" />
        </ToolbarDesktop>

        <ToolbarMobileTop>
          <BackButton href="/team" />
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
          <ToolbarMobileTopButtonSkeleton />
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <ToolbarMobileBottomButtonSkeleton className="ml-auto" />
        </ToolbarMobileBottom>

        <List>
          <Repeat items={20} renderItem={PositionListItemSkeleton} />
        </List>
      </PageGrid>
    </PageContainer>
  );
}
