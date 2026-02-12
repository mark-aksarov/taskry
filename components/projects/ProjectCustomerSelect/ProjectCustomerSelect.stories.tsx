import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCustomerSelect } from "./ProjectCustomerSelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/ProjectCustomerSelect",
  component: ProjectCustomerSelect,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectCustomerSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customers: [
      {
        id: 1,
        fullName: "John Doe",
      },
      {
        id: 2,
        fullName: "Jane Smith",
      },
      {
        id: 3,
        fullName: "Bob Johnson",
      },
    ],
  },
} satisfies Story;
