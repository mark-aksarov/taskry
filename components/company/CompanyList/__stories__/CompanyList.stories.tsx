import { CompanyList } from "../CompanyList";
import { Meta, StoryObj } from "@storybook/react";
import { CompanyListItem } from "../../CompanyListItem";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CompanyListItemStory } from "../../CompanyListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCompaniesProvider } from "../../DeleteCompaniesContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/companies/CompanyList",
  component: CompanyList,
  decorators: [
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withDeleteCompaniesProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CompanyList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedCompanySummaries.map((company) => (
      <CompanyListItem
        key={company.id}
        {...CompanyListItemStory.args}
        {...company}
      />
    )),
  },
} satisfies Story;
