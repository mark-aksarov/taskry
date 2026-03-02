import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { NewPositionModal } from "@/components/position/NewPositionModal";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { PositionToolbarActionsMenuTrigger } from "@/components/position/PositionToolbarActionsMenuTrigger";
import { PositionToolbarCreateNewModalTrigger } from "@/components/position/PositionToolbarCreateNewModalTrigger";

interface PositionsPageProps {
  totalCount: number;
  positionsContainer: React.ReactNode;
}

export function PositionsPage({
  totalCount,
  positionsContainer,
}: PositionsPageProps) {
  const t = useTranslations("app.PositionsPage");

  if (totalCount === 0) {
    return (
      <>
        <EmptyPageContainer
          heading={t("emptySection.heading")}
          description={t("emptySection.description")}
          toolbarCreateNewMenuTrigger={<PositionToolbarCreateNewModalTrigger />}
        />
        <NewPositionModal />
      </>
    );
  }

  return (
    <>
      <PageContainer>
        <PageGrid>
          <ViewModeProvider>
            <ToolbarDesktop>
              <PositionToolbarActionsMenuTrigger />
              <PositionToolbarCreateNewModalTrigger />
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <BackButton href="/team" />
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <PositionToolbarActionsMenuTrigger />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <div className="ml-auto">
                <PositionToolbarCreateNewModalTrigger />
              </div>
            </ToolbarMobileBottom>

            {positionsContainer}
          </ViewModeProvider>
        </PageGrid>
      </PageContainer>

      <NewPositionModal />
    </>
  );
}
