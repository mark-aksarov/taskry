import "server-only";

import { PositionList } from "./PositionList";
import { PositionListItem } from "./PositionListItem";
import { DeletePositionProvider } from "./DeletePositionContext";
import { UpdatePositionProvider } from "./UpdatePositionProvider";
import { deletePosition } from "@/lib/actions/position/deletePosition";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { UpdatePositionModalProvider } from "./UpdatePositionModal";

export async function PositionsContainer() {
  const positions = await getPositionSummaries();

  return (
    <PositionList>
      {positions.map((position) => (
        <UpdatePositionModalProvider key={position.id}>
          <UpdatePositionProvider>
            <DeletePositionProvider deletePosition={deletePosition}>
              <PositionListItem id={position.id} name={position.name} />
            </DeletePositionProvider>
          </UpdatePositionProvider>
        </UpdatePositionModalProvider>
      ))}
    </PositionList>
  );
}
