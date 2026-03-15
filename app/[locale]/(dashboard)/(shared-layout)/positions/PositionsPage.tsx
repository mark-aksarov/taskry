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
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { NewPositionModal } from "@/components/position/NewPositionModal";
import { PositionToolbarActionsMenuTrigger } from "@/components/position/PositionToolbarActionsMenuTrigger";
import { PositionsEmptySectionCreateButton } from "@/components/position/PositionsEmptySectionCreateButton";
import { PositionToolbarCreateNewModalTrigger } from "@/components/position/PositionToolbarCreateNewModalTrigger";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";

interface PositionsPageProps {
  totalCount: number;
  searchContainer: React.ReactNode;
  positionsContainer: React.ReactNode;
}

export function PositionsPage({
  totalCount,
  searchContainer,
  positionsContainer,
}: PositionsPageProps) {
  const t = useTranslations("app.PositionsPage");

  if (totalCount === 0) {
    return (
      <>
        <PageContainer fullscreen headerOffset>
          <PageGrid className="relative flex-auto">
            <ToolbarMobileTop>
              <BackButton href="/customers" />
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            </ToolbarMobileTop>

            <PageEmptySection
              heading={t("emptySection.heading")}
              description={t("emptySection.description")}
              createButton={<PositionsEmptySectionCreateButton />}
            />
          </PageGrid>
        </PageContainer>

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

      <TaskSearchModal searchContainer={searchContainer} />
      <NewPositionModal />
    </>
  );
}
