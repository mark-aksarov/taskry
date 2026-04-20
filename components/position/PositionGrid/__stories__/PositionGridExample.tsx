import { PositionGrid } from "../PositionGrid";
import { PositionListItem } from "../../PositionListItem";
import { mockedPositionSummaries } from "@/mocks/positions";
import { MockedDeletePositionProvider } from "../../DeletePositionProvider/__stories__";
import { MockedUpdatePositionProvider } from "../../UpdatePositionProvider/__stories__";

export function PositionGridExample() {
  return (
    <PositionGrid>
      {mockedPositionSummaries.map((position) => (
        <MockedUpdatePositionProvider key={position.id}>
          <MockedDeletePositionProvider>
            <PositionListItem key={position.id} {...position} />
          </MockedDeletePositionProvider>
        </MockedUpdatePositionProvider>
      ))}
    </PositionGrid>
  );
}
