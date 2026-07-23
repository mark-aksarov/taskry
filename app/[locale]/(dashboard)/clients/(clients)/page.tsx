import {
  dateSearchParam,
  pageSearchParam,
  booleanSearchParam,
  pageSizeSearchParam,
  searchParamToArray,
  searchQueryParam,
} from "@/lib/schemas/base";

import {
  getClientCount,
  getClientList,
} from "@/lib/data/client/client.dal";

import { z } from "zod";
import { ClientsPage } from "./ClientsPage";
import { clientSortFields } from "@/lib/types";
import { companyId } from "@/lib/schemas/company";
import { getCompanyCount } from "@/lib/data/company/company.dal";
import { CreateCompanyModal } from "@/dashboard/company/CreateCompanyModal";
import { CreateClientModal } from "@/dashboard/client/CreateClientModal";
import { ClientSearchModal } from "@/dashboard/client/ClientSearchModal";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { ImportClientsModal } from "@/dashboard/client/ImportClientsModal";
import { DeleteClientsModal } from "@/dashboard/client/DeleteClientsModal";
import { ClientFiltersModal } from "@/dashboard/client/ClientFiltersModal";
import { CreateCompanyProvider } from "@/dashboard/company/CreateCompanyProvider";
import { ClientGridContainer } from "@/dashboard/client/ClientGridContainer";
import { CreateClientProvider } from "@/dashboard/client/CreateClientProvider";
import { ClientFiltersProvider } from "@/dashboard/client/ClientFiltersContext";
import { requireProtectedPageSession } from "@/lib/utils/requireProtectedPageSession";
import { DeleteClientsProvider } from "@/dashboard/client/DeleteClientsProvider";
import { ImportClientsProvider } from "@/dashboard/client/ImportClientsProvider";
import { ClientCompanyFiltersModal } from "@/dashboard/client/ClientCompanyFiltersModal";
import { CreateClientFormContainer } from "@/dashboard/client/CreateClientFormContainer";
import { ClientFiltersFormContainer } from "@/dashboard/client/ClientFiltersFormContainer";
import { ClientRouterSearchContainer } from "@/dashboard/client/ClientRouterSearchContainer";
import { ClientCompanyFiltersFormContainer } from "@/dashboard/client/ClientCompanyFiltersFormContainer";

const searchParamsSchema = z.object({
  query: searchQueryParam,
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  deadlineFrom: dateSearchParam,
  deadlineTo: dateSearchParam,
  sort: z.enum(clientSortFields).catch("fullName"),
  hasNoActiveProjects: booleanSearchParam,
  hasActiveProjects: booleanSearchParam,
  hasOverdueProjects: booleanSearchParam,
  companyIds: z.preprocess(
    searchParamToArray,
    z.array(companyId).optional().catch(undefined),
  ),
});

export default async function AppClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Authorization
  await requireProtectedPageSession();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort, ...filters } =
    searchParamsSchema.parse(rawParams);

  // Render the empty page if there are no clients (without applying filters)
  const totalCount = await getClientCount();

  // Get clients for the current page based on filters and sorting
  const { items: clients, totalCount: totalFilteredClients } =
    await getClientList({
      page,
      pageSize,
      sort,
      filters,
    });

  // Show company filters only when companies exist
  const companyCount = await getCompanyCount();

  return (
    <SelectedItemsProvider pageItems={clients.map((c) => ({ id: c.id }))}>
      <DeleteClientsProvider>
        <CreateCompanyProvider>
          <CreateClientProvider>
            <ClientFiltersProvider filters={filters}>
              <ImportClientsProvider>
                <ClientsPage
                  page={page}
                  pageSize={pageSize}
                  totalCount={totalCount}
                  companyCount={companyCount}
                  totalFilteredClients={totalFilteredClients}
                  selectedSortField={sort}
                  // ClientGrid is passed via props to allow mocking in Storybook stories
                  clientGrid={<ClientGridContainer clients={clients} />}
                />

                <ClientSearchModal
                  searchContainer={<ClientRouterSearchContainer />}
                />
                <CreateClientModal
                  createClientFormContainer={<CreateClientFormContainer />}
                />
                <CreateCompanyModal />
                <ClientFiltersModal
                  filtersFormContainer={<ClientFiltersFormContainer />}
                />
                <ClientCompanyFiltersModal
                  filtersFormContainer={<ClientCompanyFiltersFormContainer />}
                />
                <DeleteClientsModal />
                <ImportClientsModal />
              </ImportClientsProvider>
            </ClientFiltersProvider>
          </CreateClientProvider>
        </CreateCompanyProvider>
      </DeleteClientsProvider>
    </SelectedItemsProvider>
  );
}
