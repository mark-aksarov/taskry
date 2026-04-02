import "server-only";

import { PositionList } from "./PositionList";
import { PositionListItem } from "./PositionListItem";
import { UpdatePositionModal } from "./UpdatePositionModal";
import { DeletePositionModal } from "./DeletePositionModal";
import { UpdatePositionProvider } from "./UpdatePositionProvider";
import { DeletePositionProvider } from "./DeletePositionProvider";
import { ModalManagerProvider } from "../common/ModalManagerContext";
import { getPositionSummaries } from "@/lib/data/position/position.dal";

export async function PositionsContainer() {
  const positions = await getPositionSummaries();

  return (
    <PositionList>
      {positions.map((position) => (
        <ModalManagerProvider key={position.id}>
          <UpdatePositionProvider>
            <DeletePositionProvider>
              <PositionListItem id={position.id} name={position.name} />

              <UpdatePositionModal
                positionId={position.id}
                positionName={position.name}
              />

              <DeletePositionModal
                positionId={position.id}
                positionName={position.name}
              />
            </DeletePositionProvider>
          </UpdatePositionProvider>
        </ModalManagerProvider>
      ))}
    </PositionList>
  );
}
