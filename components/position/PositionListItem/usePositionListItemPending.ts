import { useDeletePositions } from "../DeletePositionsContext";
import { useDeletePositionTransition } from "../DeletePositionTransitionContext";
import { useUpdatePositionTransition } from "../UpdatePositionTransitionContext";

export function usePositionListItemPending(companyId: number) {
  const { isPending: isDeletePositionPending } = useDeletePositionTransition();
  const { isPending: isUpdatePositionPending } = useUpdatePositionTransition();
  const { isPending: isDeleteCompaniesPending, positionIds } =
    useDeletePositions();

  const isPending =
    isDeletePositionPending ||
    isUpdatePositionPending ||
    (isDeleteCompaniesPending && positionIds.includes(companyId));

  return isPending;
}
