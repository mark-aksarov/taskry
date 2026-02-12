import { CompanyList } from "./CompanyList";
import { Meta, StoryObj } from "@storybook/react";
import { CompanyListItem } from "../CompanyListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CompanyItemActionMenuTrigger } from "../CompanyItemActionMenuTrigger";

const mockedCompanies = [
  {
    id: 1,
    name: "TechNova Solutions Inc.",
  },
  {
    id: 2,
    name: "Global Dynamics Ltd.",
  },
  {
    id: 3,
    name: "Astra Marketing Group",
  },
  {
    id: 4,
    name: "Phoenix Data Services",
  },
  {
    id: 5,
    name: "Quantum Consulting LLC",
  },
];

const meta = {
  title: "components/companies/CompanyList",
  component: CompanyList,
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
