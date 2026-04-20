import {
  CreatePositionModalTriggerLarge,
  CreatePositionModalTriggerMobile,
} from "@/dashboard/position/CreatePositionModalTrigger";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { BackButton } from "@/dashboard/common/BackButton";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
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
      <PageContainer fullscreen headerOffset>
        <PageGrid className="relative flex-auto">
          <ToolbarMobile
            firstSlot={
              <>
                <BackButton fallbackHref="/team" />
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
    );
  }

  return (
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
                <BackButton fallbackHref="/team" />
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              </>
            }
            secondSlot={<CreatePositionModalTriggerMobile />}
          />

          {positionsContainer}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
