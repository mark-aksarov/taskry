import { startTransition } from "react";

/**
 * Handle deletion of multiple entities by their IDs
 */
export function handleDeleteEntities<TPayload = number[]>(
  selectedIds: number[],
  deleteAction: (payload: TPayload) => void,
  payload: TPayload,
  setDeleteEntityIds: (ids: number[]) => void,
  clearSelectedItems: () => void,
  onModalOpenChange: (isOpen: boolean) => void,
) {
  // Close modal
  onModalOpenChange(false);

  // Highlight currently selected entities before deletion.
  // Note: selectedIds may change if the user updates selection.
  setDeleteEntityIds(selectedIds);

  // Clear selected items after the modal close animation (150ms).
  // This prevents the modal text from jumping due to deleted items.
  setTimeout(() => {
    clearSelectedItems();
  }, 150);

  // Trigger the deletion
  startTransition(() => {
    deleteAction(payload);
  });
}
