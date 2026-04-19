import { mocked } from "storybook/test";
import CompaniesPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { CompaniesPage } from "./CompaniesPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyGrid } from "@/components/company/CompanyGrid";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CompanyGridStory } from "@/components/company/CompanyGrid/__stories__";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withCreateCompanyProvider } from "@/components/company/CreateCompanyProvider/__stories__";
import { withDeleteCompaniesProvider } from "@/components/company/DeleteCompaniesProvider/__stories__";

const meta = {
  title: "pages/CompaniesPage",
  component: CompaniesPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,

    withCreateCompanyProvider,
    withDeleteCompaniesProvider,
    withSelectedItemsProvider,

    SharedPageDecorator,
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
    companiesContainer: <CompanyGrid {...CompanyGridStory.args} />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <CompaniesPageLoading />,
} satisfies Story;

export const WithNoCompaniesPage = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;
