import {
  ClientGridItemLarge,
  ClientGridItemMobile,
} from "../../ClientGridItem";

import { mockedClientList } from "@/mocks/clients";
import { ClientListItem } from "../../ClientListItem";
import { useViewMode } from "@/dashboard/common/ViewMode";
import { EntityGrid } from "@/dashboard/common/EntityGrid";
import { DeleteClientProvider } from "../../DeleteClientContext";
import { UpdateClientProvider } from "../../UpdateClientContext";

export function ClientGridExample() {
  const { viewMode } = useViewMode();

  return (
    <EntityGrid viewMode={viewMode}>
      {mockedClientList.map((client) => (
        <DeleteClientProvider key={client.id}>
          <UpdateClientProvider>
            <ClientListItem {...client} />
            <ClientGridItemMobile {...client} />
            <ClientGridItemLarge {...client} />
          </UpdateClientProvider>
        </DeleteClientProvider>
      ))}
    </EntityGrid>
  );
}
