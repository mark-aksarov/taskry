import {
  dateSearchParam,
  pageSearchParam,
  booleanSearchParam,
  pageSizeSearchParam,
  searchParamToArray,
  searchQueryParam,
} from "@/lib/schemas/base";

import { z } from "zod";
import { ClientsPage } from "./ClientsPage";
import { clientSortFields } from "@/lib/types";
import { companyId } from "@/lib/schemas/company";
import { getCompanyCount } from "@/lib/data/company/company.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { ClientGridContainer } from "@/dashboard/client/ClientGridContainer";
import { getClientCount, getClientList } from "@/lib/data/client/client.dal";
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
  await requireFullAccess();

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
    <ClientsPage
      page={page}
      pageSize={pageSize}
      totalCount={totalCount}
      companyCount={companyCount}
      totalFilteredClients={totalFilteredClients}
      selectedSortField={sort}
      filters={filters}
      selectedItems={clients.map((c) => ({ id: c.id }))}
      // Containers is passed via props to allow mocking in Storybook stories
      clientGrid={<ClientGridContainer clients={clients} />}
      createClientFormContainer={<CreateClientFormContainer />}
      searchContainer={<ClientRouterSearchContainer />}
      clientFiltersFormContainer={<ClientFiltersFormContainer />}
      clientCompanyFiltersFormContainer={<ClientCompanyFiltersFormContainer />}
    />
  );
}
