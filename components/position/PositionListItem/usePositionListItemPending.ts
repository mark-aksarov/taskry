import { useDeletePositions } from "../DeletePositionsContext";
import { useDeletePosition } from "../DeletePositionContext";
import { useUpdatePosition } from "../UpdatePositionContext";

export function usePositionListItemPending(companyId: number) {
  const { isPending: isDeletePositionPending } = useDeletePosition();
  const { isPending: isUpdatePositionPending } = useUpdatePosition();
  const { isPending: isDeleteCompaniesPending, ids: positionIds } =
    useDeletePositions();

  const isPending =
    isDeletePositionPending ||
    isUpdatePositionPending ||
    (isDeleteCompaniesPending && positionIds.includes(companyId));

  return isPending;
}
