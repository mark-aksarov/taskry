import { useCreatePosition } from "@/dashboard/position/CreatePositionContext";

export function useCreatePositionTriggerDisabled() {
  // Create position action and modal states
  const { isPending: isCreatePositionPending } = useCreatePosition();

  return isCreatePositionPending;
}
