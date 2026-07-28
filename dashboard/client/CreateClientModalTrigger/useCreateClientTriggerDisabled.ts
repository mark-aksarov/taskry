import { useCreateClient } from "@/dashboard/client/CreateClientContext";

export function useCreateClientTriggerDisabled() {
  // Create task action and modal states
  const { isPending: isCreateClientPending } = useCreateClient();

  return isCreateClientPending;
}
