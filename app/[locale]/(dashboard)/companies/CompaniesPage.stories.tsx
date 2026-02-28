import { fn, mocked } from "storybook/test";
import CompaniesPageLoading from "./loading";
import { CompaniesPage } from "./CompaniesPage";
import CompaniesTemplate from "./CompaniesTemplate";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { CompaniesPageEmpty } from "./CompaniesPageEmpty";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { CompanyList } from "@/components/company/CompanyList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { CompanyListStory } from "@/components/company/CompanyList/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "pages/CompaniesPage",
  component: CompaniesPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <CompaniesTemplate {...AppHeaderStory.args}>
        <Story />
      </CompaniesTemplate>
    ),
    withPageTransitionProvider,
    withSelectedItemsProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/companies");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof CompaniesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companiesContainer: <CompanyList {...CompanyListStory.args} />,
    createCompany: () => ({ status: "success" }),
    deleteCompanies: () => ({ status: "success" }),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <CompaniesPageLoading />,
} satisfies Story;

export const WithNoCompaniesPage = {
  args: { ...Default.args },
  render: () => (
    <CompaniesPageEmpty createCompany={() => ({ status: "success" })} />
  ),
} satisfies Story;
