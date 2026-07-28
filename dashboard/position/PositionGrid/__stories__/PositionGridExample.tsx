import { PositionGrid } from "../PositionGrid";
import { PositionListItem } from "../../PositionListItem";
import { mockedPositionSummaries } from "@/mocks/positions";
import { UpdatePositionProvider } from "../../UpdatePositionContext";
import { DeletePositionProvider } from "../../DeletePositionContext";
import { ModalManagerProvider } from "@/common/ModalManagerContext";

export function PositionGridExample() {
  return (
    <PositionGrid>
      {mockedPositionSummaries.map((position) => (
        <ModalManagerProvider key={position.id}>
          <UpdatePositionProvider>
            <DeletePositionProvider>
              <PositionListItem {...position} />
            </DeletePositionProvider>
          </UpdatePositionProvider>
        </ModalManagerProvider>
      ))}
    </PositionGrid>
  );
}
