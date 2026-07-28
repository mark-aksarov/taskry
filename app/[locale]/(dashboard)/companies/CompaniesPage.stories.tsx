import { mocked } from "storybook/test";
import CompaniesPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { CompaniesPage } from "./CompaniesPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withDashboardLayout } from "@/.storybook/withDashboardLayout";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";
import { CompanyGridExample } from "@/dashboard/company/CompanyGrid/__stories__";

const meta = {
  title: "pages/CompaniesPage",
  component: CompaniesPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withDashboardLayout],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/companies");
  },
} satisfies Meta<typeof CompaniesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  decorators: (Story) => <Story />,
  args: {
    totalCount: 10,
    selectedItems: [{ id: 1 }, { id: 2 }, { id: 3 }],
    searchContainer: <SearchListExample />,
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
