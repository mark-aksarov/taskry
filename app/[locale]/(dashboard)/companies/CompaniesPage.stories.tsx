import { mocked } from "storybook/test";
import CompaniesPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { CompaniesPage } from "./CompaniesPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DashboardPageDecorator } from "@/.storybook/DashboardPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CompanyGridExample } from "@/dashboard/company/CompanyGrid/__stories__";
import { withTaskSearchModal } from "@/dashboard/tasks/TaskSearchModal/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withCreateCompanyProvider } from "@/dashboard/company/CreateCompanyProvider/__stories__";
import { withDeleteCompaniesProvider } from "@/dashboard/company/DeleteCompaniesProvider/__stories__";

const meta = {
  title: "pages/CompaniesPage",
  component: CompaniesPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withCreateCompanyProvider,
    withDeleteCompaniesProvider,
    withSelectedItemsProvider,
    DashboardPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/companies");
  },
} satisfies Meta<typeof CompaniesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    companiesContainer: <CompanyGridExample />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <CompaniesPageLoading />,
} satisfies Story;

export const WithNoCompaniesPage = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;
