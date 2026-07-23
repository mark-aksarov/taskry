import {
  ClientGridItemLarge,
  ClientGridItemMobile,
} from "../../ClientGridItem";

import { mockedClientList } from "@/mocks/clients";
import { ClientListItem } from "../../ClientListItem";
import { useViewMode } from "@/dashboard/common/ViewMode";
import { EntityGrid } from "@/dashboard/common/EntityGrid";
import { MockedDeleteClientProvider } from "../../DeleteClientProvider/__stories__";
import { MockedUpdateClientProvider } from "../../UpdateClientProvider/__stories__";

export function ClientGridExample() {
  const { viewMode } = useViewMode();

  return (
    <EntityGrid viewMode={viewMode}>
      {mockedClientList.map((client) => (
        <MockedDeleteClientProvider key={client.id}>
          <MockedUpdateClientProvider>
            <ClientListItem {...client} />
            <ClientGridItemMobile {...client} />
            <ClientGridItemLarge {...client} />
          </MockedUpdateClientProvider>
        </MockedDeleteClientProvider>
      ))}
    </EntityGrid>
  );
}
