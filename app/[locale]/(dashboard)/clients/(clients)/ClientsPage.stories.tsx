import { mocked } from "storybook/test";
import ClientsPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { ClientsPage } from "./ClientsPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CreateClientForm } from "@/dashboard/client/CreateClientForm";
import { withDashboardLayout } from "@/.storybook/withDashboardLayout";
import { ClientFiltersForm } from "@/dashboard/client/ClientFiltersForm";
import { ClientGridExample } from "@/dashboard/client/ClientGrid/__stories__";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";
import { ClientCompanyFiltersForm } from "@/dashboard/client/ClientCompanyFiltersForm";

const meta = {
  title: "pages/ClientsPage",
  component: ClientsPage,
  parameters: { layout: "fullscreen" },
  decorators: [withDashboardLayout],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/clients");
  },
} satisfies Meta<typeof ClientsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    page: 1,
    pageSize: 1,
    totalCount: 10,
    companyCount: 5,
    totalFilteredClients: 3,
    selectedItems: [{ id: 1 }, { id: 2 }, { id: 3 }],
    selectedSortField: "fullName",
    filters: {},
    clientGrid: <ClientGridExample />,
    createClientFormContainer: (
      <CreateClientForm companySelectItems={mockedCompanySummaries} />
    ),
    searchContainer: <SearchListExample />,
    clientFiltersFormContainer: (
      <ClientFiltersForm companyCheckboxGroupItems={mockedCompanySummaries} />
    ),
    clientCompanyFiltersFormContainer: (
      <ClientCompanyFiltersForm
        companyCheckboxGroupItems={mockedCompanySummaries}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <ClientsPageLoading />,
} satisfies Story;

export const WithNoClients = {
  args: {
    ...Default.args,
    totalCount: 0,
  },
} satisfies Story;

export const WithEmptyFilterResult = {
  args: { ...Default.args, totalFilteredClients: 0 },
} satisfies Story;
