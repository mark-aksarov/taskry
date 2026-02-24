import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { PositionToolbarCreateNewModalTrigger } from "@/components/position/PositionToolbarCreateNewModalTrigger";

interface PositionsPageEmptyProps {
  guestMode: boolean;
  createPosition: ActionFn<ActionState, FormData>;
}

export function PositionsPageEmpty({
  guestMode,
  createPosition,
}: PositionsPageEmptyProps) {
  const t = useTranslations("app.PositionsPageEmpty");

  const positionToolbarCreateNewModalTrigger = (
    <PositionToolbarCreateNewModalTrigger
      guestMode={guestMode}
      createPosition={createPosition}
    />
  );

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={positionToolbarCreateNewModalTrigger}
    />
  );
}
