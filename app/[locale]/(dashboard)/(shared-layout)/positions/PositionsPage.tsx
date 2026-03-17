import {
  CreatePositionModalTriggerLarge,
  CreatePositionModalTriggerMobile,
} from "@/components/position/CreatePositionModalTrigger";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { ToolbarLarge, ToolbarMobile } from "@/components/common/Toolbar";
import { NewPositionModal } from "@/components/position/NewPositionModal";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { PositionActionsMenuTrigger } from "@/components/position/PositionActionsMenuTrigger";
import { PositionsEmptySectionCreateButton } from "@/components/position/PositionsEmptySectionCreateButton";

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
            <ToolbarMobile
              firstSlot={
                <>
                  <BackButton href="/team" />
                  <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                </>
              }
            />

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
            <ToolbarLarge
              firstSlot={<PositionActionsMenuTrigger />}
              secondSlot={<CreatePositionModalTriggerLarge />}
            />

            <ToolbarMobile
              firstSlot={
                <>
                  <BackButton href="/team" />
                  <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                </>
              }
              secondSlot={<CreatePositionModalTriggerMobile />}
            />

            {positionsContainer}
          </ViewModeProvider>
        </PageGrid>
      </PageContainer>

      <TaskSearchModal searchContainer={searchContainer} />
      <NewPositionModal />
    </>
  );
}
