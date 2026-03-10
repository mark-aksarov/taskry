import { fn, mocked } from "storybook/test";
import CompaniesPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { CompaniesPage } from "./CompaniesPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { CompanyList } from "@/components/company/CompanyList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CompanyListStory } from "@/components/company/CompanyList/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withCreateCompanyProvider } from "@/components/company/CreateCompanyContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withDeleteCompaniesProvider } from "@/components/company/DeleteCompaniesContext/__stories__";

const meta = {
  title: "pages/CompaniesPage",
  component: CompaniesPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withCreateCompanyProvider,
    withDeleteCompaniesProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withPageTransitionProvider,
    PageDecorator,
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
