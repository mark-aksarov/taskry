import "server-only";

import { PositionList } from "./PositionList";
import { PositionListItem } from "./PositionListItem";
import { DeletePositionProvider } from "./DeletePositionProvider";
import { UpdatePositionProvider } from "./UpdatePositionProvider";
import { UpdatePositionModalProvider } from "./UpdatePositionModal";
import { getPositionSummaries } from "@/lib/data/position/position.dal";

export async function PositionsContainer() {
  const positions = await getPositionSummaries();

  return (
    <PositionList>
      {positions.map((position) => (
        <UpdatePositionModalProvider key={position.id}>
          <UpdatePositionProvider>
            <DeletePositionProvider>
              <PositionListItem id={position.id} name={position.name} />
            </DeletePositionProvider>
          </UpdatePositionProvider>
        </UpdatePositionModalProvider>
      ))}
    </PositionList>
  );
}
