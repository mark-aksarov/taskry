import { PositionList } from "./PositionList";
import { PositionListItem } from "./PositionListItem";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { PositionItemActionMenuTrigger } from "./PositionItemActionMenuTrigger";

export async function PositionsContainer() {
  const positions = await getPositionSummaries();

  return (
    <PositionList>
      {positions.map((position) => (
        <PositionListItem
          key={position.id}
          id={position.id}
          name={position.name}
          menuTrigger={
            <PositionItemActionMenuTrigger
              guestMode={false}
              positionId={position.id}
              positionName={position.name}
            />
          }
        />
      ))}
    </PositionList>
  );
}
