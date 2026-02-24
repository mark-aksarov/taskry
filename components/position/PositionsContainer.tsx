"server only";

import { PositionList } from "./PositionList";
import { PositionListItem } from "./PositionListItem";
import { DeletePositionModalProvider } from "./DeletePositionModal";
import { updatePosition } from "@/lib/actions/position/updatePosition";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { deletePositions } from "@/lib/actions/position/deletePositions";

export async function PositionsContainer() {
  const positions = await getPositionSummaries();

  return (
    <DeletePositionModalProvider deleteEntity={deletePositions}>
      <PositionList>
        {positions.map((position) => (
          <PositionListItem
            key={position.id}
            id={position.id}
            name={position.name}
            guestMode={false}
            updatePosition={updatePosition}
          />
        ))}
      </PositionList>
    </DeletePositionModalProvider>
  );
}
