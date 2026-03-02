import { startTransition } from "react";

/**
 * Handle deletion of a single entity
 */
export function handleDeleteEntity<TId = number, TPayload = TId[]>(
  removeSelected: (id: TId) => void,
  deleteAction: (payload: TPayload) => void,
  payload: TPayload,
  entityId: TId,
  onModalOpenChange: (isOpen: boolean) => void,
) {
  //Remove the entity from the selection to prevent access to it
  removeSelected(entityId);

  //close modal before deleting
  onModalOpenChange(false);

  startTransition(() => deleteAction(payload));
}
