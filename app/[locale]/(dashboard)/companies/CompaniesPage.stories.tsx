import CompaniesPageLoading from "./loading";
import { fn, mocked } from "storybook/test";
import { CompaniesPage } from "./CompaniesPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { CompaniesPageEmpty } from "./CompaniesPageEmpty";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { CompanyList } from "@/components/company/CompanyList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CompanyToolbarCreateNewButton } from "@/components/company/CompanyToolbarCreateNewButton";
import { Default as CompanyListStory } from "@/components/company/CompanyList/CompanyList.stories";
import { CompanyToolbarActionsMenuTrigger } from "@/components/company/CompanyToolbarActionsMenuTrigger";
import { CompanyToolbarCreateNewButtonStory } from "@/components/company/CompanyToolbarCreateNewButton/__stories__";
import { CompanyToolbarActionsMenuTriggerStory } from "@/components/company/CompanyToolbarActionsMenuTrigger/__stories__";

const meta = {
  title: "pages/CompaniesPage",
  component: CompaniesPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/companies");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof CompaniesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const companyToolbarCreateNewButton = (
  <CompanyToolbarCreateNewButton {...CompanyToolbarCreateNewButtonStory.args} />
);

export const Default = {
  args: {
    companiesContainer: <CompanyList {...CompanyListStory.args} />,
    companyToolbarCreateNewButton: companyToolbarCreateNewButton,
    companyToolbarActionsMenuTrigger: (
      <CompanyToolbarActionsMenuTrigger
        {...CompanyToolbarActionsMenuTriggerStory.args}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <CompaniesPageLoading />,
} satisfies Story;

export const WithNoCompaniesPage = {
  args: { ...Default.args },
  render: () => (
    <CompaniesPageEmpty
      companyToolbarCreateNewButton={companyToolbarCreateNewButton}
    />
  ),
} satisfies Story;
