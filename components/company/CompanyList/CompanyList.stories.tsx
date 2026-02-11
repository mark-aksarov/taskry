import { CompanyList } from "./CompanyList";
import { Meta, StoryObj } from "@storybook/react";
import { CompanyListItem } from "../CompanyListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CompanyItemActionMenuTrigger } from "../CompanyItemActionMenuTrigger";

const mockedCompanies = [
  { id: 1, name: "Project Manager" },
  { id: 2, name: "Frontend Developer" },
  { id: 3, name: "Backend Developer" },
  { id: 4, name: "UI/UX Designer" },
  { id: 5, name: "QA Engineer" },
];

const meta = {
  title: "components/companies/CompanyList",
  component: CompanyList,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof CompanyList>;

export default meta;
type Story = StoryObj<typeof CompanyList>;

export const Default = {
  args: {
    children: mockedCompanies.map((company) => (
      <CompanyListItem
        key={company.id}
        id={company.id}
        name={company.name}
        menuTrigger={
          <CompanyItemActionMenuTrigger
            guestMode={false}
            companyId={company.id}
            companyName={company.name}
          />
        }
      />
    )),
  },
} satisfies Story;
