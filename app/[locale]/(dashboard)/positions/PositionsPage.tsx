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
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { PositionActionsMenuTrigger } from "@/dashboard/position/PositionActionsMenuTrigger";
import { PositionsEmptySectionCreateButton } from "@/dashboard/position/PositionsEmptySectionCreateButton";

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
      <DashboardContainer fullscreen headerOffset>
        <DashboardGrid className="relative flex-auto">
          <ToolbarLarge firstSlot={<PositionManageMenuTriggerLarge />} />

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
        </DashboardGrid>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardGrid>
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
      </DashboardGrid>
    </DashboardContainer>
  );
}
