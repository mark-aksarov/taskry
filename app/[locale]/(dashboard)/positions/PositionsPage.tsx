import {
  CreatePositionModalTriggerLarge,
  CreatePositionModalTriggerMobile,
} from "@/dashboard/position/CreatePositionModalTrigger";

import {
  PositionManageMenuTriggerLarge,
  PositionManageMenuTriggerMobile,
} from "@/dashboard/position/PositionManageMenuTrigger";

import { useTranslations } from "next-intl";
import { BackButton } from "@/dashboard/common/BackButton";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { SelectedItem } from "@/lib/hooks/useSelectedItemsState";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { CreatePositionModal } from "@/dashboard/position/CreatePositionModal";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { DeletePositionsModal } from "@/dashboard/position/DeletePositionsModal";
import { ImportPositionsModal } from "@/dashboard/position/ImportPositionsModal";
import { CreatePositionProvider } from "@/dashboard/position/CreatePositionContext";
import { DeletePositionsProvider } from "@/dashboard/position/DeletePositionsContext";
import { PositionActionsMenuTrigger } from "@/dashboard/position/PositionActionsMenuTrigger";
import { PositionsEmptySectionCreateButton } from "@/dashboard/position/PositionsEmptySectionCreateButton";

interface PositionsPageProps {
  totalCount: number;
  selectedItems: SelectedItem[];
  positionsContainer: React.ReactNode;
  searchContainer: React.ReactNode;
}

export function PositionsPage({
  totalCount,
  selectedItems,
  positionsContainer,
  searchContainer,
}: PositionsPageProps) {
  const t = useTranslations("app.PositionsPage");

  const isEmpty = totalCount === 0;

  return (
    <SelectedItemsProvider pageItems={selectedItems}>
      <DeletePositionsProvider>
        <CreatePositionProvider>
          <DashboardContainer fullscreen={isEmpty} headerOffset={isEmpty}>
            <DashboardGrid
              className={isEmpty ? "relative flex-auto" : undefined}
            >
              {isEmpty ? (
                <>
                  <ToolbarLarge
                    firstSlot={<PositionManageMenuTriggerLarge />}
                  />

                  <ToolbarMobile
                    firstSlot={
                      <>
                        <BackButton fallbackHref="/team" />
                        <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                      </>
                    }
                    secondSlot={<PositionManageMenuTriggerMobile />}
                  />

                  <PageEmptySection
                    heading={t("emptySection.heading")}
                    description={t("emptySection.description")}
                    createButton={<PositionsEmptySectionCreateButton />}
                  />
                </>
              ) : (
                <ViewModeProvider>
                  <ToolbarLarge
                    firstSlot={
                      <>
                        <PositionManageMenuTriggerLarge />
                        <PositionActionsMenuTrigger />
                      </>
                    }
                    secondSlot={<CreatePositionModalTriggerLarge />}
                  />

                  <ToolbarMobile
                    firstSlot={
                      <>
                        <BackButton fallbackHref="/team" />
                        <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                      </>
                    }
                    secondSlot={
                      <>
                        <PositionManageMenuTriggerMobile />
                        <CreatePositionModalTriggerMobile />
                      </>
                    }
                  />

                  {positionsContainer}
                </ViewModeProvider>
              )}
            </DashboardGrid>
          </DashboardContainer>

          <TaskSearchModal searchContainer={searchContainer} />
          <CreatePositionModal />
          <DeletePositionsModal />
          <ImportPositionsModal />
        </CreatePositionProvider>
      </DeletePositionsProvider>
    </SelectedItemsProvider>
  );
}
