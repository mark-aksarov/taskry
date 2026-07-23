import { useDeleteClients } from "../DeleteClientsContext";
import { useDeleteClient } from "../DeleteClientContext";
import { useUpdateClient } from "../UpdateClientContext";

export function useClientItemPending(clientId: number) {
  const { isPending: isDeleteClientPending } = useDeleteClient();
  const { isPending: isDeleteClientsPending, ids: clientIds } =
    useDeleteClients();
  const { isPending: isUpdateClientPending } = useUpdateClient();

  const isPending =
    isDeleteClientPending ||
    isUpdateClientPending ||
    (isDeleteClientsPending && clientIds.includes(clientId));

  return isPending;
}
