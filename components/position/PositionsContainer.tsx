import "server-only";

import { PositionList } from "./PositionList";
import { PositionListItem } from "./PositionListItem";
import { updatePosition } from "@/lib/actions/position/updatePosition";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { deletePositions } from "@/lib/actions/position/deletePositions";

export async function PositionsContainer() {
  const positions = await getPositionSummaries();

  return (
    <PositionList>
      {positions.map((position) => (
        <PositionListItem
          key={position.id}
          id={position.id}
          name={position.name}
          updatePosition={updatePosition}
          deletePosition={deletePositions}
        />
      ))}
    </PositionList>
  );
}
