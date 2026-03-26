import "server-only";

import { PositionList } from "./PositionList";
import { PositionListItem } from "./PositionListItem";
import { PositionProviders } from "./PositionProviders";
import { UpdatePositionModal } from "./UpdatePositionModal";
import { DeletePositionModal } from "./DeletePositionModal";
import { getPositionSummaries } from "@/lib/data/position/position.dal";

export async function PositionsContainer() {
  const positions = await getPositionSummaries();

  return (
    <PositionList>
      {positions.map((position) => (
        <PositionProviders key={position.id}>
          <PositionListItem id={position.id} name={position.name} />

          <UpdatePositionModal
            positionId={position.id}
            positionName={position.name}
          />

          <DeletePositionModal
            positionId={position.id}
            positionName={position.name}
          />
        </PositionProviders>
      ))}
    </PositionList>
  );
}
