import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { PositionToolbarActionsMenuTrigger } from "@/components/position/PositionToolbarActionsMenuTrigger";
import { PositionToolbarCreateNewModalTrigger } from "@/components/position/PositionToolbarCreateNewModalTrigger";

interface PositionsPageProps {
  positionsContainer: React.ReactNode;
  createPosition: ActionFn<ActionState, FormData>;
  deletePositions: ActionFn<ActionState, number[]>;
}

export function PositionsPage({
  positionsContainer,
  createPosition,
  deletePositions,
}: PositionsPageProps) {
  const t = useTranslations("app.PositionsPage");

  const positionToolbarCreateNewModalTrigger = (
    <PositionToolbarCreateNewModalTrigger createPosition={createPosition} />
  );

  const positionToolbarActionsMenuTrigger = (
    <PositionToolbarActionsMenuTrigger deletePositions={deletePositions} />
  );

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            {positionToolbarActionsMenuTrigger}
            {positionToolbarCreateNewModalTrigger}
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <BackButton href="/team" />
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            {positionToolbarActionsMenuTrigger}
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <div className="ml-auto">
              {positionToolbarCreateNewModalTrigger}
            </div>
          </ToolbarMobileBottom>

          {positionsContainer}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
