import { CompanyList } from "../CompanyList";
import { Meta, StoryObj } from "@storybook/react";
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
  title: "components/companies/CompanyList",
  component: CompanyList,
  decorators: [
    withDeleteCompaniesProvider,
    withSelectedItemsProvider,
    withCurrentUserProvider,
    withModalManagerProvider,

    withThemedBackground,
  ],
} satisfies Meta<typeof CompanyList>;

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
