import { fn, mocked } from "storybook/test";
import CompaniesPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { CompaniesPage } from "./CompaniesPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { SearchList } from "@/components/search/SearchList";
import { CompanyList } from "@/components/company/CompanyList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { CompanyListStory } from "@/components/company/CompanyList/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withCreateCompanyProvider } from "@/components/company/CreateCompanyContext/__stories__";
import { withDeleteCompaniesProvider } from "@/components/company/DeleteCompaniesContext/__stories__";
import { withCreateCompanyModalProvider } from "@/components/company/CreateCompanyModal/__stories__";

const meta = {
  title: "pages/CompaniesPage",
  component: CompaniesPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    // preserve provider order as in page.tsx file
    withCreateCompanyProvider,
    withCreateCompanyModalProvider,
    withDeleteCompaniesProvider,
    withSelectedItemsProvider,
    PageDecorator, // most providers and layout are defined in PageDecorator
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
    searchContainer: <SearchList {...SearchListStory.args} />,
    companiesContainer: <CompanyList {...CompanyListStory.args} />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <CompaniesPageLoading />,
} satisfies Story;

export const WithNoCompaniesPage = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
