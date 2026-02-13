import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectFiltersFormCustomerCheckboxGroup } from "../ProjectFiltersFormCustomerCheckboxGroup";

const meta = {
  title: "components/projects/ProjectFiltersFormCustomerCheckboxGroup",
  component: ProjectFiltersFormCustomerCheckboxGroup,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectFiltersFormCustomerCheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customers: [
      {
        id: 1,
        fullName: "Customer 1",
      },
      {
        id: 2,
        fullName: "Customer 2",
      },
      {
        id: 3,
        fullName: "Customer 3",
      },
      {
        id: 4,
        fullName: "Customer 4",
      },
      {
        id: 5,
        fullName: "Customer 5",
      },
    ],
  },
} satisfies Story;
