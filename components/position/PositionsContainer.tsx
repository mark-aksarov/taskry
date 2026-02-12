import { PositionList } from "./PositionList";
import { PositionListItem } from "./PositionListItem";
import { EditPositionForm } from "./EditPositionForm";
import { updatePosition } from "@/lib/actions/position/updatePosition";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { PositionItemActionMenuTrigger } from "./PositionItemActionMenuTrigger";
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
          menuTrigger={
            <PositionItemActionMenuTrigger
              guestMode={false}
              positionId={position.id}
              positionName={position.name}
              deletePositions={deletePositions}
              editPositionForm={
                <EditPositionForm
                  positionId={position.id}
                  nameDefaultValue={position.name}
                  updatePosition={updatePosition}
                />
              }
            />
          }
        />
      ))}
    </PositionList>
  );
}
