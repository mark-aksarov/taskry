import { CompanyList } from "../CompanyList";
import { Meta, StoryObj } from "@storybook/react";
import { CompanyListItem } from "../../CompanyListItem";
import { CompanyListItemStory } from "../../CompanyListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withDeleteCompanyModalProvider } from "../../DeleteCompanyModal/__stories__";

const mockedCompanies = [
  { id: 1, name: "Company 1" },
  { id: 2, name: "Company 2" },
  { id: 3, name: "Company 3" },
  { id: 4, name: "Company 4" },
  { id: 5, name: "Company 5" },
];

const meta = {
  title: "components/companies/CompanyList",
  component: CompanyList,
  decorators: [
    withDeleteCompanyModalProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CompanyList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedCompanies.map((company) => (
      <CompanyListItem
        {...CompanyListItemStory.args}
        key={company.id}
        {...company}
      />
    )),
  },
} satisfies Story;
