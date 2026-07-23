import { mocked } from "storybook/test";
import ClientsPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { ClientsPage } from "./ClientsPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DashboardPageDecorator } from "@/.storybook/DashboardPageDecorator";
import { ClientGridExample } from "@/dashboard/client/ClientGrid/__stories__";
import { withClientSearchModal } from "@/dashboard/client/ClientSearchModal/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withCreateCompanyProvider } from "@/dashboard/company/CreateCompanyProvider/__stories__";
import { withCreateClientProvider } from "@/dashboard/client/CreateClientProvider/__stories__";
import { withClientFiltersProvider } from "@/dashboard/client/ClientFiltersContext/__stories__";
import { withDeleteClientsProvider } from "@/dashboard/client/DeleteClientsProvider/__stories__";

const meta = {
  title: "pages/ClientsPage",
  component: ClientsPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withClientSearchModal,
    withClientFiltersProvider,
    withCreateClientProvider,
    withCreateCompanyProvider,
    withDeleteClientsProvider,
    withSelectedItemsProvider,
    DashboardPageDecorator,
    withThemedBackground,
  ],
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
    selectedSortField: "fullName",
    clientGrid: <ClientGridExample />,
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
