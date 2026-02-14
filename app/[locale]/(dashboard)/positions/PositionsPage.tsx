import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { SelectionProvider } from "@/components/common/SelectionContext";

interface PositionsPageProps {
  positionsContainer: React.ReactNode;
  positionToolbarCreateNewModalTrigger: React.ReactNode;
  positionToolbarActionsMenuTrigger: React.ReactNode;
}

export function PositionsPage({
  positionsContainer,
  positionToolbarCreateNewModalTrigger,
  positionToolbarActionsMenuTrigger,
}: PositionsPageProps) {
  const t = useTranslations("app.PositionsPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <SelectionProvider>
            <ToolbarDesktop>
              {positionToolbarActionsMenuTrigger}
              {positionToolbarCreateNewModalTrigger}
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              {positionToolbarActionsMenuTrigger}
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <div className="ml-auto">
                {positionToolbarCreateNewModalTrigger}
              </div>
            </ToolbarMobileBottom>

            {positionsContainer}
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
