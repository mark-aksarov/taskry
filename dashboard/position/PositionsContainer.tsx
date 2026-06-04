import "server-only";

import { PositionGrid } from "./PositionGrid";
import { PositionListItem } from "./PositionListItem";
import { GuestModeModal } from "../common/GuestModeModal";
import { UpdatePositionModal } from "./UpdatePositionModal";
import { DeletePositionModal } from "./DeletePositionModal";
import { UpdatePositionProvider } from "./UpdatePositionProvider";
import { DeletePositionProvider } from "./DeletePositionProvider";
import { ModalManagerProvider } from "../../common/ModalManagerContext";
import { getPositionSummaries } from "@/lib/data/position/position.dal";

export async function PositionsContainer() {
  const positions = await getPositionSummaries();

  return (
    <PositionGrid>
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

              <GuestModeModal />
            </DeletePositionProvider>
          </UpdatePositionProvider>
        </ModalManagerProvider>
      ))}
    </PositionGrid>
  );
}
