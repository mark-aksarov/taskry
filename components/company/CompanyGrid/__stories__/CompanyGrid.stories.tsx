import { CompanyGrid } from "../CompanyGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyListItem } from "../../CompanyListItem";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CompanyListItemStory } from "../../CompanyListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedUpdateCompanyProvider } from "../../UpdateCompanyProvider/__stories__";
import { MockedDeleteCompanyProvider } from "../../DeleteCompanyProvider/__stories__";
import { withDeleteCompaniesProvider } from "../../DeleteCompaniesProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";

const meta = {
  title: "components/companies/CompanyGrid",
  component: CompanyGrid,
  decorators: [
    withDeleteCompaniesProvider,
    withSelectedItemsProvider,
    withCurrentUserProvider,
    withModalManagerProvider,

    withThemedBackground,
  ],
} satisfies Meta<typeof CompanyGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedCompanySummaries.map((company) => (
      <MockedUpdateCompanyProvider key={company.id}>
        <MockedDeleteCompanyProvider>
          <CompanyListItem
            key={company.id}
            {...CompanyListItemStory.args}
            {...company}
          />
        </MockedDeleteCompanyProvider>
      </MockedUpdateCompanyProvider>
    )),
  },
} satisfies Story;
