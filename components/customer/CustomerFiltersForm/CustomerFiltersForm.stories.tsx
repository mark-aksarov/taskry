import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerFiltersForm } from "./CustomerFiltersForm";
import { mocked } from "storybook/internal/test";
import { getCompanies } from "@/lib/queries/companies";
import { companiesMock } from "@/lib/data/__mocks__/companies";
import { CompanyCheckboxGroup } from "@/components/companies/CompanyCheckboxGroup";

const meta: Meta<typeof CustomerFiltersForm> = {
  title: "Components/customers/CustomerFiltersForm",
  component: CustomerFiltersForm,
  tags: ["autodocs"],
  beforeEach: () => {
    mocked(getCompanies).mockReturnValue(
      new Promise((res) => res(companiesMock)),
    );
  },

  render: (args) => {
    const companiesPromise = getCompanies(1);

    return (
      <CustomerFiltersForm
        {...args}
        companyCheckboxGroup={
          <CompanyCheckboxGroup companiesPromise={companiesPromise} />
        }
      />
    );
  },
} satisfies Meta<typeof CustomerFiltersForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
