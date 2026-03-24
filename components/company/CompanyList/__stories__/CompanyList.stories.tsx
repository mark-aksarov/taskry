import { CompanyList } from "../CompanyList";
import { Meta, StoryObj } from "@storybook/react";
import { CompanyListItem } from "../../CompanyListItem";
import { mockedCompanySummaries } from "@/mocks/companies";
import { UpdateCompanyModalProvider } from "../../UpdateCompanyModal";
import { CompanyListItemStory } from "../../CompanyListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedDeleteCompanyProvider } from "../../DeleteCompanyContext/__stories__";
import { MockedUpdateCompanyProvider } from "../../UpdateCompanyContext/__stories__";
import { withDeleteCompaniesProvider } from "../../DeleteCompaniesProvider/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/companies/CompanyList",
  component: CompanyList,
  decorators: [
    // mocking providers
    withDeleteCompaniesProvider,
    withSelectedItemsProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,

    withThemedBackground,
  ],
} satisfies Meta<typeof CompanyList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedCompanySummaries.map((company) => (
      <UpdateCompanyModalProvider>
        <MockedUpdateCompanyProvider key={company.id}>
          <MockedDeleteCompanyProvider>
            <CompanyListItem
              key={company.id}
              {...CompanyListItemStory.args}
              {...company}
            />
          </MockedDeleteCompanyProvider>
        </MockedUpdateCompanyProvider>
      </UpdateCompanyModalProvider>
    )),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
